# Stage 1: Build the JAR with Maven
FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder
WORKDIR /app

# Cache dependencies
COPY Backend/pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and package application
COPY Backend/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Lightweight OpenJDK 17 Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080
ENV PORT=8080

ENTRYPOINT ["java", "-Xmx384m", "-jar", "app.jar"]
