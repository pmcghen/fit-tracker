FROM python:3.11-alpine

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend

COPY ./requirements.txt .

# RUN apk add --virtual .build-deps --no-cache postgresql-dev gcc python3-dev musl-dev && \
#         pip install --no-cache-dir -r requirements.txt && \
#         apk --purge del .build-deps

RUN pip install -r requirements.txt

COPY . .

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]