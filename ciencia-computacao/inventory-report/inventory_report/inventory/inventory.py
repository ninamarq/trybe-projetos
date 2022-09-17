from inventory_report.reports.complete_report import CompleteReport
from inventory_report.reports.simple_report import SimpleReport
import csv
import json
import xml.etree.ElementTree as ET


def read_csv(path):
    with open(path, encoding='utf-8') as file:
        report_reader = csv.reader(file, delimiter=',', quotechar='"')
        header, *data = report_reader

    file_arr = []
    for row in data:
        file_dict = {}
        for index in range(len(header)):
            file_dict[header[index]] = row[index]
        file_arr.append(file_dict)

    return file_arr


def read_json(path):
    with open(path) as file:
        file_arr = json.load(file)

    return file_arr


def read_xml(path):
    file = []
    tree = ET.parse(path)
    keepInstructions = 'instrucoes_de_armazenamento'
    for product in tree.findall('record'):
        file.append(
          {
            'id': product.find('id').text,
            'nome_do_produto': product.find('nome_do_produto').text,
            'nome_da_empresa': product.find('nome_da_empresa').text,
            'data_de_fabricacao': product.find('data_de_fabricacao').text,
            'data_de_validade': product.find('data_de_validade').text,
            'numero_de_serie': product.find('numero_de_serie').text,
            keepInstructions: product.find(keepInstructions).text,
          }
        )
    return file


def read_selector(path):
    if path.endswith('csv'):
        return read_csv(path)

    if path.endswith('json'):
        return read_json(path)

    if path.endswith('xml'):
        return read_xml(path)


class Inventory:
    def import_data(path, report_type):
        report_data = read_selector(path)
        report = ''
        if (report_type == 'simples'):
            report = SimpleReport.generate(report_data)
        else:
            report = CompleteReport.generate(report_data)
        return report
