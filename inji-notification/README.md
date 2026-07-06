# Notification Service

## Overview
A Spring Boot microservice for sending push notifications via Firebase Cloud Messaging (FCM). It supports device mapping management, secure bank authentication, robust error handling, and is ready for containerized deployment.

---

## Features
- Send notifications to devices using Firebase
- Device mapping management (add/update device tokens by CPF)
- Bank authentication via headers (x-bank-id, x-bank-secret)
- Robust error handling with detailed messages and HTTP status codes
- Logging for all operations and errors
- Docker and Kubernetes ready (with file mounting for secrets)

---

## Prerequisites
- Java 21
- Maven
- PostgreSQL
- Docker & Docker Compose (for containerized deployment)

---

## Environment Variables & Configuration

Set the following in your `application.properties`:

```
# Path to the Firebase service account JSON (mounted in Docker/K8s)
firebase.service.account.path=/app/inji-sender-dtp-meu-imovel-rural-487c8e5dc36a.json

# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/notificationdb
spring.datasource.username=your_db_user
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update

# Server port
server.port=8082
```

**Mounting the Firebase JSON file:**
- Locally: Place the file at the path above or update the property.
- Docker Compose example:
  ```yaml
  volumes:
    - ./inji-sender-dtp-meu-imovel-rural-487c8e5dc36a.json:/app/inji-sender-dtp-meu-imovel-rural-487c8e5dc36a.json:ro
  ```
- For K8s: Use a ConfigMap or Secret and mount to `/app/inji-sender-dtp-meu-imovel-rural-487c8e5dc36a.json`.

---

## Database Setup

### Device Mapping Table
```sql
CREATE TABLE device_mapping (
    cpf_number VARCHAR(20) PRIMARY KEY,
    device_fcm_token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
```

### Bank Secrets Table
```sql
CREATE TABLE bank_secrets (
    bank_id VARCHAR(50) PRIMARY KEY,
    bank_secret VARCHAR(255) NOT NULL
);
```

---

## Running Locally

### 1. Build
```
mvn clean package
```

### 2. Run (local)
```
java -jar target/notification-service-1.0-SNAPSHOT.jar
```

### 3. Run with Docker
```
docker build -t notification-service .
docker run -p 8082:8082 \
  -v $(pwd)/inji-sender-dtp-meu-imovel-rural-487c8e5dc36a.json:/app/inji-sender-dtp-meu-imovel-rural-487c8e5dc36a.json:ro \
  --env SPRING_DATASOURCE_URL=jdbc:postgresql://host.docker.internal:5432/notificationdb \
  --env SPRING_DATASOURCE_USERNAME=your_db_user \
  --env SPRING_DATASOURCE_PASSWORD=your_db_password \
  notification-service
```

### 4. Run with Docker Compose
See `docker-compose.yml` for mounting and environment setup.

---

## API Endpoints

### 1. Send Notification
- **POST** `/notify`
- **Headers:**
  - `Content-Type: application/json`
  - `x-bank-id: <bank_id>`
  - `x-bank-secret: <bank_secret>`
- **Body:**
```json
{
  "cpfNumber": "1234567890",
  "request": {
    "notification": { "title": "...", "body": "..." },
    "data": { "key": "value" }
  }
}
```
- **Response:**
  - `200 OK` on success
  - `401 Unauthorized` if bank credentials invalid
  - `404 Not Found` if device not found
  - `500 Internal Server Error` for other failures

### 2. Add/Update Device Mapping
- **POST** `/device-mapping`
- **Body:**
```json
{
  "cpfNumber": "1234567890",
  "deviceFcmToken": "token_here"
}
```
- **Response:**
  - `200 OK` on create/update
  - `400 Bad Request` for invalid input
  - `500 Internal Server Error` for other failures

---

## Error Handling
- All errors return a JSON body with `error` and `failureCause` fields.
- Global exception handler ensures consistent error responses.
- Example:
```json
{
  "error": "Device not found",
  "failureCause": "No device mapping for given CPF"
}
```

---

## Logging
- All requests, responses, and errors are logged with context.
- Sensitive data (like secrets) is never logged.

---

## Deployment Notes
- Use Docker/K8s volume mounts for the Firebase service account JSON.
- Never commit secret files to version control (see `.gitignore`).
- Expose port 8082.

---

## Security Notes
- Bank authentication is enforced for notification requests.
- All secrets and sensitive files must be mounted, not committed.

---

## Contribution & License
- PRs welcome. Please follow code style and add tests.
- License: MIT (or your choice)

---

## .gitignore
Ensure your `.gitignore` includes:
```
inji-sender-dtp-meu-imovel-rural-487c8e5dc36a.json
/target/
/.idea/
```

---

## Contact
For issues, open a GitHub issue or contact the maintainer.
