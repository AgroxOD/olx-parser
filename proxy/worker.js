addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  if (url.pathname !== '/offers') {
    return new Response('Not found', { status: 404 });
  }

  const apiUrl = new URL('https://www.olx.ua/api/v1/offers');
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
