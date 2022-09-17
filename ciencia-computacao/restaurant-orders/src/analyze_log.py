import csv


def read_file(path_file):
    if not path_file.endswith(".csv"):
        raise FileNotFoundError(f"Extensão inválida '{path_file}'")
    try:
        with open(path_file, encoding="utf-8") as file:
            requests = []
            data = csv.reader(file, delimiter=",", quotechar='"')
            for order in data:
                requests.append(order)
        return requests
    except FileNotFoundError:
        raise FileNotFoundError(f"Arquivo inexistente: '{path_file}'")


def favorite_by(customer, requests):
    counter = 0
    favorite = ''
    meals = [line[1] for line in requests if customer in line]

    for meal in meals:
        counting = meals.count(meal)
        if counting >= counter:
            favorite = meal
            counter = counting
    return favorite


def get_meals_by_costumer(customer, requests):
    meals = [line[1] for line in requests if customer in line]
    meals_obj = {}

    for meal in meals:
        meals_obj[meal] = meals.count(meal)

    response = {customer: meals_obj}
    return response


def counter_meal_by(customer, meal, request):
    meals = get_meals_by_costumer(customer, request)
    return meals[customer][meal]


def get_all_meals(request):
    return set([line[1] for line in request])


def meals_never_ordered_by(customer, requests):
    all_meals = get_all_meals(requests)
    custommer_meals = get_meals_by_costumer(customer, requests)
    current_meals = set(custommer_meals[customer])
    response = []

    for meal in all_meals:
        if meal not in current_meals:
            response.append(meal)

    return set(response)


def opened_days(request):
    return list(set([line[2] for line in request]))


def days_on(customer, request):
    return list(set([
        line[2] for line in request
        if customer in line
    ]))


def days_off(customer, requests):
    days_open = set(opened_days(requests))
    days_frequented = set(days_on(customer, requests))
    response = []

    for day in days_open:
        if day not in days_frequented:
            response.append(day)

    return set(response)


def return_analyzes(requests):
    formatted = (
        f"{favorite_by('maria', requests)}\n"
        f"{counter_meal_by('arnaldo', 'hamburguer', requests)}\n"
        f"{meals_never_ordered_by('joao', requests)}\n"
        f"{days_off('joao', requests)}\n"
    )
    return formatted


def analyze_log(path_to_file):
    read_file(path_to_file)

    with open(path_to_file) as file:
        content = csv.reader(file, delimiter=",", quotechar='"')
        data = [line for line in content]

    with open("data/mkt_campaign.txt", mode="w") as file:
        to_write = return_analyzes(data)
        file.writelines(to_write)
