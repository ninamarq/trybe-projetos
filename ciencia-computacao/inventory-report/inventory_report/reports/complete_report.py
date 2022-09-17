from inventory_report.reports.simple_report import SimpleReport


def getProductsByCompany(products):
    companies = []
    for product in products:
        companies.append(product["nome_da_empresa"])
    companiesObj = {}
    for company in companies:
        companiesObj[company] = companies.count(company)
    returnString = ""
    for key, value in companiesObj.items():
        returnString += f"- {str(key)}: {str(value)}\n"
    return returnString


class CompleteReport(SimpleReport):
    def generate(products):
        companiesProductsQuantity = getProductsByCompany(products)

        return (
          f'{SimpleReport.generate(products)}\n'
          'Produtos estocados por empresa:\n'
          f'{companiesProductsQuantity}'
        )
