# OLX Dropship Parser

🔍 Парсит объявления с OLX через внутренний JSON API. Настройки теперь можно выбрать через удобный веб-интерфейс.

## 🚀 Использование

1. Открой `public/index.html` на GitHub Pages;
2. Заполни параметры и скачай `config.json`;
3. Помести его в `input/` директорию;
4. Запусти в Codex: `bash run_task.sh`;
5. Файл `output/result.csv` появится вместе с обновлённой страницей `public/olx-result.html`.
6. GitHub Actions автоматически обновит результаты при изменении `input/config.json`.

Поле `lang` в конфиге задаёт язык выдачи OLX. Значение передаётся в API и в заголовок `Accept-Language`.
