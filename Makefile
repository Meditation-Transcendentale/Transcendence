# Variables
DOCKER_COMPOSE = docker compose
DOCKER_COMPOSE_FILE = docker-compose.yml
DOCKER_COMPOSE_FILE_LOGGING = -f docker-compose.yml -f elk/docker-compose.logging.yml

# Targets
.PHONY: build down re

build:
	$(DOCKER_COMPOSE) up --build

build-logging:
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE_LOGGING) up --build

down:
	$(DOCKER_COMPOSE) down

down-logging:
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE_LOGGING) down

re:
	$(DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE) up --build

re-logging:
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE_LOGGING) down
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE_LOGGING) up --build