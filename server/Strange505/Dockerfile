FROM openjdk:17-jdk-alpine
ARG env
ENV env_name $env
ARG JAR_FILE=build/libs/*SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT java -jar /app.jar --spring.profiles.active=${env_name}
