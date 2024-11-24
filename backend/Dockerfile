FROM eclipse-temurin:17.0.12_7-jdk-noble
COPY . .
RUN chmod +x mvnw
RUN ./mvnw clean install -DskipTests
ENTRYPOINT ["java", "-jar", "target/todo-list-0.0.1-SNAPSHOT.jar"]