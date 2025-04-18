DOCKER_COMPOSE = docker compose
DOCKER_COMPOSE_FILE = docker-compose.yml

.PHONY: build down re

build:
	$(DOCKER_COMPOSE) up --build

down:
	$(DOCKER_COMPOSE) down
	if [ -d ./shared ]; then \
        rm -rf ./shared; \
    fi

re:
	if [ -d ./shared ]; then \
        rm -rf ./shared; \
    fi
	$(DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE) up --build

