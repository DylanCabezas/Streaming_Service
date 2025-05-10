# Microservicio Contenido

## Se usa:
- Java
- Postgresql
- Spring Boot, Maven
- Docker, Docker compose

## Endpoints:
- POST /video
- GET /videos
- GET /video/{video_id}
- DELETE /video/{video_id}
- GET /videos/search
- GET /videos/genre/{genre}
- POST /rating
- GET /ratings/{video_id}

## Pasos a seguir:
1). Descargar la carpeta
2). Dentro de la carpeta hacer el comando: docker compose up
3). Puede usar postman con el archivo Content Microservice.postman_collection.json que está ahí y reemplace localhost con la ip pública de la máquina virtual en uso.

## Comandos variados:
mvn -DskipTests=true package: Sirve para obtener video-service SNAPSHOT que está en el directorio folder. Es obligatorio tenerlo.
```bash
mvn -DskipTests=true package


docker exec -it content_microservice-postgres-1 psql -U postgres -d video-db

docker run -d --name postgres -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgresql -e POSTGRES_DB=video-db postgres

docker-compose up --build
docker compose up
docker compose down
```
