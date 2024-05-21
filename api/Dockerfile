FROM python:3.10-slim

WORKDIR /app

COPY . /app

ENV PIP_DEFAULT_TIMEOUT=300

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]
