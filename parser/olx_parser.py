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
params["lang"] = lang

headers = {
    "User-Agent": "Mozilla/5.0",
    "Accept-Language": lang,
}

