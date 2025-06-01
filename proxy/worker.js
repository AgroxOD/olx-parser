addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  let endpoint;
  // поддерживаем запросы как на /offers, так и на корневой URL
  if (url.pathname === '/' || url.pathname === '/offers') {
    endpoint = 'https://www.olx.ua/api/v1/offers';
  } else if (url.pathname === '/offers/categories' || url.pathname === '/categories') {
    endpoint = 'https://www.olx.ua/api/v1/offers/categories';
  } else {
    return new Response('Not found', { status: 404 });
  }

  const apiUrl = new URL(endpoint);
  apiUrl.search = url.search;

  const olxResp = await fetch(apiUrl.toString(), {
    headers: {
      'Accept-Language': request.headers.get('accept-language') || 'uk',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Referer': 'https://www.olx.ua/'
    }
  });

  const headers = new Headers(olxResp.headers);
  headers.set('Access-Control-Allow-Origin', '*');

  return new Response(olxResp.body, {
    status: olxResp.status,
    headers
  });
}
