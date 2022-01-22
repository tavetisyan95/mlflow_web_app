FROM tiangolo/uwsgi-nginx-flask:python3.8


COPY requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt

ENV STATIC_URL /static
ENV STATIC_PATH /app/static

WORKDIR /app
COPY mlflow_api.py .
COPY parsers.py .

RUN mkdir static

CMD flask run --host=0.0.0.0 --port=80