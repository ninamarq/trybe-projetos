import requests
import time
from parsel import Selector
from tech_news.database import create_news


# Requisito 1
def fetch(url):
    time.sleep(1)
    try:
        response = requests.get(
            url, headers={"user-agent": "Fake user-agent"}, timeout=3
        )
        response.raise_for_status()
    except (requests.HTTPError, requests.Timeout):
        return None
    return response.text


# Requisito 2
def scrape_novidades(html_content):
    selector = Selector(html_content)
    list = []
    for link in selector.css('h2.entry-title > a ::attr(href)'):
        list.append(link.get())
    return list


# Requisito 3
def scrape_next_page_link(html_content):
    try:
        selector = Selector(html_content)
        next_page = selector.css('div.nav-links a.next ::attr(href)').get()
    except (requests.HTTPError, requests.Timeout):
        return None
    return next_page


# Requisito 4
def scrape_noticia(html_content):
    selector = Selector(html_content)
    css_selec_sum = ".entry-content > p:nth-of-type(1) ::text"
    get_summ = selector.css(css_selec_sum).getall()
    summary = ''.join(get_summ).strip()
    return {
        "url": selector.css("link[rel='canonical']::attr(href)").get(),
        "title": selector.css('h1.entry-title ::text').get().strip(),
        "timestamp": selector.css('.post-meta .meta-date::text').get(),
        "writer": selector.css(".post-meta .author a::text").get(),
        "comments_count": len(selector.css('.comment-list li').getall()),
        "summary": summary,
        "tags": selector.css(".post-tags ul li a::text").getall(),
        "category": selector.css(".category-style .label::text").get()
    }


# Requisito 5
def get_tech_news(amount):
    base_url = "https://blog.betrybe.com"
    index = 0
    tech_news = list()
    while index < amount:
        base_html = fetch(base_url)
        article_links = scrape_novidades(base_html)
        for url in article_links[0:amount-index]:
            article_html = fetch(url)
            article = scrape_noticia(article_html)
            tech_news.append(article)
            index += 1
        base_url = scrape_next_page_link(base_html)
    create_news(tech_news)
    return tech_news
