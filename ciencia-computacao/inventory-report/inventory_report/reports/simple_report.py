from datetime import datetime


def getOlderProduct(products):
    older = datetime.strptime('3030-06-14', '%Y-%m-%d').date()
    for product in products:
        fab_date = datetime.strptime(
            product['data_de_fabricacao'], '%Y-%m-%d'
        ).date()
        if fab_date < older:
            older = datetime.strptime(
                product['data_de_fabricacao'], '%Y-%m-%d'
            ).date()
    return older


def getClosestProduct(products):
    today = datetime.today().date()
    closest = datetime.strptime('3030-06-14', '%Y-%m-%d').date()
    for product in products:
        expiration_date = datetime.strptime(
            product['data_de_validade'], '%Y-%m-%d'
            ).date()
        if expiration_date > today and expiration_date < closest:
            closest = expiration_date

    return closest


def getMoreProductsCompany(products):
    companies = list(product['nome_da_empresa'] for product in products)
    return max(companies, key=companies.count)


class SimpleReport:
    def generate(products):

        older = getOlderProduct(products)
        closest = getClosestProduct(products)
        company = getMoreProductsCompany(products)

        return (
          f'Data de fabricação mais antiga: {older}\n'
          f'Data de validade mais próxima: {closest}\n'
          f'Empresa com mais produtos: {company}'
        )
