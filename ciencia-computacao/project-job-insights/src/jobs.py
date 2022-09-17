from functools import lru_cache
import csv


@lru_cache
def read(path):
    with open(path, encoding="utf-8") as file:
        csv_file = csv.DictReader(file, delimiter=",", quotechar='"')
        stack_list = list(csv_file)
        return stack_list
