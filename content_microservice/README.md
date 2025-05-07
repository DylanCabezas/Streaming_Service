# Microservicio Contenido

## Se usa:
- Java
- Postgresql
- Spring Boot
- Docker y Docker compose

## Endpoints:
- POST /video
- GET /videos
- GET /video/{video_id}
- DELETE /video/{video_id}
- GET /videos/search
- GET /videos/genre/{genre}
- POST /rating
- GET /ratings/{video_id}

## Comandos variados: (Esto fue probado localmente, se verá posteriormente en la nube)
```bash
mvn -DskipTests=true package

docker exec -it content_microservice-postgres-1 psql -U postgres -d video-db

docker run -d --name postgres -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgresql -e POSTGRES_DB=video-db postgres

docker-compose up --build
docker compose up
docker compose down