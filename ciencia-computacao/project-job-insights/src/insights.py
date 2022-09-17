import src.jobs


def get_unique_job_types(path):
    read_jobs = src.jobs.read(path)
    job_types = []
    for job in read_jobs:
        get_type = job["job_type"]
        if get_type != "":
            job_types.append(get_type)
    unique_job_types = set(job_types)
    return unique_job_types


def get_unique_industries(path):
    read_industries = src.jobs.read(path)
    industries = []
    for industry in read_industries:
        get_industry = industry["industry"]
        if get_industry != "":
            industries.append(get_industry)
    unique_industries = set(industries)
    return unique_industries


def get_max_salary(path):
    read_salaries = src.jobs.read(path)
    max_salaries = []
    for salary in read_salaries:
        if salary["max_salary"] != "":
            try:
                intSalary = int(salary["max_salary"])
                max_salaries.append(intSalary)
            except ValueError:
                pass
    return max(max_salaries)


def get_min_salary(path):
    read_salaries = src.jobs.read(path)
    min_salaries = []
    for salary in read_salaries:
        if salary["min_salary"] != "":
            try:
                intSalary = int(salary["min_salary"])
                min_salaries.append(intSalary)
            except ValueError:
                pass
    return min(min_salaries)


def filter_by_job_type(jobs, job_type):
    returnList = []
    for job in jobs:
        if job["job_type"] == job_type:
            returnList.append(job)
    return returnList


def filter_by_industry(jobs, industry):
    returnList = []
    for job in jobs:
        if job["industry"] == industry:
            returnList.append(job)
    return returnList


def matches_salary_range(job, salary):
    if (
        "min_salary" not in job or "max_salary" not in job
        or type(job["max_salary"]) != int or type(job["min_salary"]) != int
        or job["max_salary"] < job["min_salary"]
        or type(salary) != int
        or job["min_salary"] > job["max_salary"]
    ):
        raise ValueError()
    else:
        return job["max_salary"] >= salary >= job["min_salary"]


def filter_by_salary_range(jobs, salary):
    returnList = []
    for job in jobs:
        try:
            if matches_salary_range(job, salary):
                returnList.append(job)
        except ValueError:
            continue
    return returnList
