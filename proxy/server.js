const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/offers', async (req, res) => {
  const url = 'https://www.olx.ua/api/v1/offers?' + new URLSearchParams(req.query);
  const olxRes = await fetch(url, {
    headers: { 'Accept-Language': req.headers['accept-language'] || 'en-US' }
  });
  res.status(olxRes.status);
  olxRes.headers.forEach((v, k) => res.setHeader(k, v));
  olxRes.body.pipe(res);
});

app.listen(PORT, () => {
  console.log('Proxy listening on port ' + PORT);
});
