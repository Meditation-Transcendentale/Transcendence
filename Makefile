# Variables
DOCKER_COMPOSE = docker compose
DOCKER_COMPOSE_FILE = docker-compose.yml

# Targets
.PHONY: build down re

build:
	$(DOCKER_COMPOSE) up --build

down:
	$(DOCKER_COMPOSE) down

re:
	$(DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE) up --build

