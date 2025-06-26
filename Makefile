DOCKER_COMPOSE = docker compose
DOCKER_COMPOSE_FILE = -f docker-compose.yml -f ./services/stats/docker-compose-stats.yml -f ./metrics/docker-compose-metrics.yml

.PHONY: all build down stop up re cleanVolumes reCleanData update-hostname-env

# curl -u <username>:<password> ftp://<ftp_host>/chemin/vers/.env -o .env

all : re

build:
	$(MAKE) update-hostname-env
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) up --build

down:
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) down

stop:
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) stop

up:
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) up

re:
	$(MAKE) update-hostname-env
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) down
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) up --build

cleanVolumes:
	docker volume rm -f $$(docker volume ls)

reCleanData:
	if [ -d ./shared ]; then \
		rm -rf ./shared; \
	fi
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) down
	docker volume rm -f $$(docker volume ls)
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE) up --build

update-hostname-env:
	@if grep -q '^HOSTNAME=' .env; then \
		sed -i "s/^HOSTNAME=.*/HOSTNAME=$$(hostname)/" .env; \
	else \
		echo "\nHOSTNAME=$$(hostname)" >> .env; \
	fi
