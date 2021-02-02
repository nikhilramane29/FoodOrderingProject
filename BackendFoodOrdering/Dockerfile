FROM openjdk:8-jdk-alpine
ARG JAR_FILE=target/food-ordering-system.jar
COPY ${JAR_FILE} app.jar
COPY target/application.properties application.properties
ENTRYPOINT ["java","-jar","-Dspring.profiles.active=prod","/app.jar"]