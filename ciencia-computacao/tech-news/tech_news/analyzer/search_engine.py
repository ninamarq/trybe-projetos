from tech_news.database import search_news
from datetime import datetime


# Requisito 6
def search_by_title(title):
    news = search_news({"title": {"$regex": f"{title.lower()}"}})
    return [
        (article["title"], article["url"]) for article in news
    ]


# Requisito 7
def search_by_date(date):
    result = []
    try:
        formatted_date = datetime.strftime(
            datetime.fromisoformat(date), '%d/%m/%Y'
        )
        news = search_news({"timestamp": formatted_date})
        for new in news:
            result.append((new["title"], new["url"]))
        return result
    except ValueError:
        raise ValueError('Data inválida')


# Requisito 8
def search_by_tag(tag):
    result = []
    news = search_news({"tags": {"$regex": f"{tag}", "$options": "i"}})
    for new in news:
        result.append((new["title"], new["url"]))
    return result


# Requisito 9
def search_by_category(category):
    result = []
    news = search_news(
        {"category": {"$regex": f"{category.lower().capitalize()}"}}
    )
    for new in news:
        result.append((new["title"], new["url"]))
    return result
