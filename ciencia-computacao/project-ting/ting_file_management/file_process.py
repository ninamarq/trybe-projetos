import sys
from ting_file_management.file_management import txt_importer


def process(path_file, instance):
    is_file_queued = txt_importer(path_file)
    response = {
        "nome_do_arquivo": path_file,
        "qtd_linhas": len(is_file_queued),
        "linhas_do_arquivo": is_file_queued
    }
    if (response not in instance.queue):
        instance.enqueue(response)
        print(response)


def remove(instance):
    if (len(instance) == 0):
        return print("Não há elementos", file=sys.stdout)
    removed_file = instance.dequeue()
    print(
        "Arquivo "
        + removed_file["nome_do_arquivo"]
        + " removido com sucesso"
        )


def file_metadata(instance, position):
    try:
        file_found = instance.search(position)
        return print(file_found, file=sys.stdout)
    except IndexError:
        return print("Posição inválida", file=sys.stderr)
