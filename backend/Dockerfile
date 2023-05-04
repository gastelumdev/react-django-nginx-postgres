# pull official base image
FROM python:3.10.10-slim-buster

# set working directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
RUN apt-get update && apt-get -y install libpq-dev gcc && pip install psycopg2
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# add app
COPY . .

# start app
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "project.wsgi:application"]