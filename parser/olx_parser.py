import os
import csv
import json
import requests

with open('input/config.json', 'r', encoding='utf-8') as f:
    config = json.load(f)

category = str(config.get("category", ""))
keywords = config.get("keywords", "")
price_min = config.get("price_min", 0)
price_max = config.get("price_max", 999999)

params = {
    "query": keywords,
    "limit": 40,
    "offset": 0,
    "sort_by": "created_at:desc",
    "filter_float_price:from": price_min,
    "filter_float_price:to": price_max,
}
if category.isdigit():
    params["category_id"] = category

headers = {"User-Agent": "Mozilla/5.0"}

try:
    resp = requests.get(
        "https://www.olx.ua/api/v1/offers/",
        params=params,
        headers=headers,
        timeout=10,
    )
    resp.raise_for_status()
    data = resp.json()
except Exception as e:
    print(f"Ошибка запроса: {e}")
    exit(1)

items = []
for offer in data.get("data", []):
    title = offer.get("title", "—")
    price = offer.get("price", {}).get("value", "—")
    city = offer.get("location", {}).get("city", "—")
    url = offer.get("url", "—")
    items.append([title, price, city, url])

os.makedirs("output", exist_ok=True)


with open("output/result.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["Название", "Цена", "Город", "Ссылка"])
    writer.writerows(items)

print(f"Сохранено: {len(items)} объявлений.")

