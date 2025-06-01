# OLX Dropship Parser

🔍 Парсит объявления с OLX через внутренний JSON API. Настройки, включая язык `lang`, можно выбрать через удобный веб-интерфейс.

## 🚀 Использование

1. Открой `public/index.html` на GitHub Pages.
2. Выбери категорию из дерева и нужный язык, затем скачай `config.json`.
3. Помести его в директорию `input/`.
4. Запусти в Codex: `bash run_task.sh`.
5. Файл `output/result.csv` появится вместе с обновлённой страницей `public/olx-result.html`.
6. GitHub Actions автоматически обновит результаты при изменении `input/config.json`.
