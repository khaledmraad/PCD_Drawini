version: "3.8"

services:
mysqldb:
image: mysql:5.7
restart: unless-stopped
env_file: ./.env
environment:
        - MYSQL_ROOT_PASSWORD=$MYSQLDB_ROOT_PASSWORD
      - MYSQL_DATABASE=$MYSQLDB_DATABASE
ports:
        - $MYSQLDB_LOCAL_PORT:$MYSQLDB_DOCKER_PORT
volumes:
        - db:/var/lib/mysql
app:
depends_on:
        - mysqldb
build: ./mysqlshit
restart: on-failure
env_file: ./.env
environment:
        - SPRING_APPLICATION_JSON={"spring.datasource.url":"jdbc:mysql://localhost:3306/Ecommerce_users","spring.datasource.username":"$MYSQLDB_USER","spring.datasource.password":"$MYSQLDB_ROOT_PASSWORD","spring.jpa.properties.hibernate.dialect":"org.hibernate.dialect.MySQLDialect"}
ports:
        - $SPRING_LOCAL_PORT:$SPRING_DOCKER_PORT
volumes:
        - .m2:/root/.m2
stdin_open: true
tty: true

volumes:
db:
