class TrackOrders:
    def __init__(self):
        self.list_orders = []

    def __len__(self):
        return len(self.list_orders)

    def add_new_order(self, customer, order, day):
        self.list_orders.append({
            'customer': customer,
            'order': order,
            'day': day
        })
        return self.list_orders

    def get_most_ordered_dish_per_customer(self, customer):
        customers_meals = []
        for order in self.list_orders:
            if order['customer'] == customer:
                customers_meals.append(order['order'])
        counter = 0
        most = ''
        for meal in customers_meals:
            counting = customers_meals.count(meal)
            if counter <= counting:
                counter = counting
                most = meal
        return most

    def get_never_ordered_per_customer(self, customer):
        all_meals = []
        customer_meals = []
        response = []
        for order in self.list_orders:
            all_meals.append(order['order'])
            if order['customer'] == customer:
                customer_meals.append(order['order'])

        for meal in set(all_meals):
            if meal not in set(customer_meals):
                response.append(meal)

        return set(response)

    def get_days_never_visited_per_customer(self, customer):
        all_days = []
        customer_days = []
        response = []
        for order in self.list_orders:
            all_days.append(order['day'])
            if order['customer'] == customer:
                customer_days.append(order['day'])

        for day in set(all_days):
            if day not in set(customer_days):
                response.append(day)
        return set(response)

    def get_busiest_day(self):
        all_days = []
        for order in self.list_orders:
            all_days.append(order['day'])

        counter = 0
        busiest = ''
        for day in all_days:
            counting = all_days.count(day)
            if counter <= counting:
                counter = counting
                busiest = day
        return busiest

    def get_least_busy_day(self):
        all_days = []
        for order in self.list_orders:
            all_days.append(order['day'])

        counter = 0
        least_busy = ''
        for day in all_days:
            counting = all_days.count(day)
            if counter == 0:
                counter = counting
            if counting <= counter:
                counter = counting
                least_busy = day
        return least_busy
