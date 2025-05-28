DOCKER_COMPOSE = docker compose
DOCKER_COMPOSE_FILE = -f docker-compose.yml -f ./services/stats/docker-compose-stats.yml

.PHONY: build down re

build:
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) up --build

down:
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) down
	if [ -d ./shared ]; then \
        rm -rf ./shared; \
    fi
	docker volume rm -f $$(docker volume ls)

re:
	if [ -d ./shared ]; then \
        rm -rf ./shared; \
    fi
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) down
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) up --build

reKeepData:
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) down
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) up --build

