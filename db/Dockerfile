FROM postgres:18.6-alpine
COPY *.sql /docker-entrypoint-initdb.d/
ENV POSTGRES_USER=postgres
ENV POSTGRES_DB=testdb