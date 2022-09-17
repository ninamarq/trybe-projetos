def is_anagram(first_string, second_string):
    lower_first = first_string.lower()
    lower_second = second_string.lower()

    if (first_string == "" or second_string == ""):
        return False

    for letter in lower_first:
        if (lower_first.count(letter) != lower_second.count(letter)):
            return False
        if (letter not in lower_second):
            return False
    else:
        return True
