def study_schedule(permanence_period, target_time):
    try:
        total = 0
        for period in permanence_period:
            if (period[0] <= target_time <= period[1]):
                total += 1
        return total
    except TypeError:
        return None
