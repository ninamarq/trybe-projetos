import sys


def txt_importer(path_file):
    if path_file.endswith(".txt"):
        try:
            with open(path_file, 'r') as file:
                txt_file = file.read().split('\n')
                return txt_file
        except FileNotFoundError:
            return print(
                f"Arquivo {path_file} não encontrado", file=sys.stderr
                )
    return print("Formato inválido", file=sys.stderr)
