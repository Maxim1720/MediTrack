FROM openjdk:21-slim-buster
WORKDIR /app
COPY ./target/meditrack-backend-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
