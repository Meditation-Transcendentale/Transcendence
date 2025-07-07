IMAGE_NAME=front
CONTAINER_NAME=frontend-frontend-1
DOCKERFILE=Dockerfile
PORT=7000
DOCKER_COMPOSE_FILE=docker-compose.yml
UID := $(shell id -u)
GID := $(shell id -g)

all: up

id:
	export UID=$(UID) 
	export GID=$(GID)

build: id
	docker build -f $(DOCKERFILE) -t $(IMAGE_NAME) .

up: id
	docker compose -f $(DOCKER_COMPOSE_FILE) up --build

down:
	docker compose -f $(DOCKER_COMPOSE_FILE) stop -t 3
	docker compose -f $(DOCKER_COMPOSE_FILE) rm -f -v
	docker compose -f $(DOCKER_COMPOSE_FILE) down

logs:
	docker compose -f $(DOCKER_COMPOSE_FILE) logs -f

bash:
	docker exec -it $(CONTAINER_NAME) bash

clean:
	docker system prune -f

rebuild: id
	docker compose -f $(DOCKER_COMPOSE_FILE) down
	docker compose -f $(DOCKER_COMPOSE_FILE) up --build

