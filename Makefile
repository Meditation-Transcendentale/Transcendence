DOCKER_COMPOSE = docker compose
DOCKER_COMPOSE_FILE = -f docker-compose.yml -f ./services/stats/docker-compose-stats.yml 

.PHONY: build down up re reKeepData update-hostname-env

build:
	$(MAKE) update-hostname-env
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) up --build

down:
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) down
	if [ -d ./shared ]; then \
		rm -rf ./shared; \
	fi
	docker volume rm -f $$(docker volume ls)

up:
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) up

re:
	if [ -d ./shared ]; then \
		rm -rf ./shared; \
	fi
	$(MAKE) update-hostname-env
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) down
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) up --build

reKeepData:
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) down
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) up --build

update-hostname-env:
	@if grep -q '^HOSTNAME=' .env; then \
		sed -i "s/^HOSTNAME=.*/HOSTNAME=$$(hostname)/" .env; \
	else \
		echo "HOSTNAME=$$(hostname)" >> .env; \
	fi