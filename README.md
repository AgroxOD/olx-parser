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

После развертывания укажите адрес Worker в скрипте `window.PROXY_URL` внутри `public/index.html`. По умолчанию используется `https://rapid-bar-2ad1.omkrishna-narayana.workers.dev/offers`, но вы можете заменить его на собственный адрес.

## Хостинг на GitHub Pages

1. Сделайте fork репозитория или склонируйте его.
2. В настройках GitHub Pages выберите режим `Deploy from a folder` и укажите каталог `public`.
3. Разверните код из `proxy/worker.js` на Cloudflare Workers или любой другой serverless‑платформе.
4. При необходимости отредактируйте в `public/index.html` значение `window.PROXY_URL`, указав адрес своего Worker. Сейчас там используется `https://rapid-bar-2ad1.omkrishna-narayana.workers.dev/offers`.
5. После публикации перейдите по URL вашей страницы GitHub Pages.

## 🚀 Использование

1. Открой `public/index.html` на GitHub Pages.
2. Категории загружаются автоматически с OLX при открытии страницы.
3. Выбери категорию, укажи ключевые слова и диапазон цен.
4. Нажми «Найти» — результаты появятся в таблице под формой.
