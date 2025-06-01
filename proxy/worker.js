addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Загружает HTML со страницы OLX и выдёргивает данные объявлений
 */
async function loadOffers(search) {
  const target = new URL('https://www.olx.ua/uk/list/');
  target.search = search;

  const resp = await fetch(target.toString(), {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Referer': 'https://www.olx.ua/'
    }
  });

  const html = await resp.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');

  // ищем карточки объявлений и собираем нужные поля
  const results = [];
  doc.querySelectorAll('[data-cy="l-card"]').forEach(card => {
    const title = card.querySelector('h6, h5')?.textContent.trim() || '';
    const price = card.querySelector('[data-testid="ad-price"], .css-10b0gli')?.textContent.trim() || '';
    const link = card.querySelector('a[href]')?.href || '';
    const cityRaw = card.querySelector('[data-testid="location-date"]')?.textContent.trim() || '';
    const city = cityRaw.split('-')[0].trim();
    results.push({ title, price, link, city });
  });

  return results;
}

/**
 * Получает JSON с категориями с сайта OLX
 */
async function loadCategories() {
  const resp = await fetch('https://www.olx.ua/api/v1/offers/categories');
  const data = await resp.json();
  const categories = data.categories || data.data?.categories || data.data || [];
  return categories;
}

async function handleRequest(request) {
  const url = new URL(request.url);

  if (url.pathname === '/' || url.pathname === '/offers') {
    const offers = await loadOffers(url.search);
    const body = JSON.stringify({ data: offers });
    return new Response(body, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  if (url.pathname === '/offers/categories' || url.pathname === '/categories') {
    const categories = await loadCategories();
    const body = JSON.stringify({ categories });
    return new Response(body, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  return new Response('Not found', {
    status: 404,
    headers: { 'Access-Control-Allow-Origin': '*' }
  });
}
