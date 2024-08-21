FROM maven:3.8.5-openjdk-17

WORKDIR /jaava-app
COPY . .
RUN mvn clean  -Dmaven.test.skip=true install

CMD mvn spring-boot:run

