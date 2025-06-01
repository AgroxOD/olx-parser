# OLX Dropship Parser

🔍 Парсит объявления с OLX через внутренний JSON API. Все запросы выполняются прямо в браузере.

Вся логика парсинга реализована на JavaScript. Для обхода CORS нужен небольшой прокси.

## ⚠️ CORS

Прямые запросы к `https://www.olx.ua/api/v1/offers/` из браузера не работают.
OLX не отправляет заголовок `Access-Control-Allow-Origin` для внешних сайтов,
поэтому браузер блокирует ответы. Чтобы получить данные, отправляйте запросы
через прокси или serverless-функцию.

### Пример прокси на Cloudflare Workers

Файл `proxy/worker.js` содержит минимальный скрипт для Cloudflare Workers, который проксирует запросы к OLX. Создайте новый Worker в панели Cloudflare, замените его содержимое кодом из этого файла и опубликуйте его.

После развертывания укажите адрес Worker в скрипте `window.PROXY_URL` из `public/index.html`, например `https://<worker>.workers.dev/offers`.

## Хостинг на GitHub Pages

1. Сделайте fork репозитория или склонируйте его.
2. В настройках GitHub Pages выберите режим `Deploy from a folder` и укажите каталог `public`.
3. Разверните код из `proxy/worker.js` на Cloudflare Workers или любой другой serverless‑платформе.
4. В `public/index.html` найдите скрипт, задающий `window.PROXY_URL`, и замените значение на URL вашего Worker, например `https://<worker>.workers.dev/offers`.
5. После публикации перейдите по URL вашей страницы GitHub Pages.

## 🚀 Использование

1. Открой `public/index.html` на GitHub Pages.
2. Выбери категорию, укажи ключевые слова и диапазон цен.
3. Нажми «Найти» — результаты появятся в таблице под формой.
