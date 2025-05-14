IMAGE_NAME=front
CONTAINER_NAME=front-container
DOCKERFILE=Dockerfile.dev
PORT=8080
DOCKER_COMPOSE_FILE=docker-compose.yml

build:
	docker build -f $(DOCKERFILE) -t $(IMAGE_NAME) .

up:
	docker compose -f $(DOCKER_COMPOSE_FILE) up --build

down:
	docker compose -f $(DOCKER_COMPOSE_FILE) down

logs:
	docker compose -f $(DOCKER_COMPOSE_FILE) logs -f

bash:
	docker exec -it $(CONTAINER_NAME) bash

clean:
	docker system prune -f

rebuild:
	docker compose -f $(DOCKER_COMPOSE_FILE) down
	docker compose -f $(DOCKER_COMPOSE_FILE) up --build

