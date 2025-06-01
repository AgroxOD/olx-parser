import requests, csv, json
from bs4 import BeautifulSoup

with open('input/config.json', 'r', encoding='utf-8') as f:
    config = json.load(f)

category = config.get("category", "elektronika/telefony")
keywords = config.get("keywords", "")
price_min = config.get("price_min", 0)
price_max = config.get("price_max", 999999)
lang = config.get("lang", "uk")

url = f"https://www.olx.ua/{lang}/{category}/?search[filter_float_price:from]={price_min}&search[filter_float_price:to]={price_max}&search[description]=1&q={keywords}"
headers = {"User-Agent": "Mozilla/5.0"}
resp = requests.get(url, headers=headers)
soup = BeautifulSoup(resp.text, "html.parser")

items = []
for item in soup.select("div[data-cy='l-card']"):
    title = item.select_one("h6").text if item.select_one("h6") else "—"
    price = item.select_one("p[data-testid='ad-price']").text.strip() if item.select_one("p[data-testid='ad-price']") else "—"
    link = item.find("a")["href"]
    city = item.select_one("p[data-testid='location-date']").text if item.select_one("p[data-testid='location-date']") else "—"
    items.append([title, price, city, link])

with open("output/result.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["Название", "Цена", "Город", "Ссылка"])
    writer.writerows(items)

print(f"Сохранено: {len(items)} объявлений.")
