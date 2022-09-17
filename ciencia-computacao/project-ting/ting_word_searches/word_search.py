def exists_word(word, instance):
    response = []

    for index in range(len(instance)):
        file = instance.search(index)
        lines = [
            {"linha": index + 1}
            for index, line in enumerate(file["linhas_do_arquivo"])
            if word in line.lower()
        ]
        obj_to_append = {
            "palavra": word,
            "arquivo": file["nome_do_arquivo"],
            "ocorrencias": lines,
        }
        if obj_to_append["ocorrencias"] == []:
            return []

        if obj_to_append:
            response.append(obj_to_append)

    return response


def search_by_word(word, instance):
    """Aqui irá sua implementação"""
