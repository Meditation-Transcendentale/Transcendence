DOCKER_COMPOSE = docker compose

DOCKER_COMPOSE_USER = -f docker-compose.yml
DOCKER_COMPOSE_STATS = -f ./services/stats/docker-compose-stats.yml
DOCKER_COMPOSE_FRONTEND = -f ./frontend/docker-compose.yml
DOCKER_COMPOSE_GAME = -f ./services/game/docker-compose.dev.yml
DOCKER_COMPOSE_METRICS = -f ./metrics/docker-compose-metrics.yml

TARGET ?= all

ifeq ($(TARGET),user)
	DOCKER_COMPOSE_FILE = $(DOCKER_COMPOSE_USER)
else ifeq ($(TARGET),stats)
	DOCKER_COMPOSE_FILE = $(DOCKER_COMPOSE_STATS)
else ifeq ($(TARGET),frontend)
	DOCKER_COMPOSE_FILE = $(DOCKER_COMPOSE_FRONTEND)
else ifeq ($(TARGET),game)
	DOCKER_COMPOSE_FILE = $(DOCKER_COMPOSE_GAME)
else ifeq ($(TARGET),all)
	DOCKER_COMPOSE_FILE = $(DOCKER_COMPOSE_USER) \
						  $(DOCKER_COMPOSE_STATS) \
						  $(DOCKER_COMPOSE_FRONTEND) \
						  $(DOCKER_COMPOSE_GAME) \
						  $(DOCKER_COMPOSE_METRICS)
else
	$(error Unknown TARGET value '$(TARGET)')
endif

.PHONY: all build down stop up re cleanVolumes clean cleanShared reCleanData update-hostname-env

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

cleanVolumes:
	docker volume rm -f $$(docker volume ls)

cleanShared:
	if [ -d ./shared ]; then \
		rm -rf ./shared; \
	fi

update-hostname-env:
	@if grep -q '^HOSTNAME=' .env; then \
		sed -i "s/^HOSTNAME=.*/HOSTNAME=$$(hostname)/" .env; \
	else \
		echo "" >> .env; \
		echo "HOSTNAME=$$(hostname)" >> .env; \
	fi

re:
	$(MAKE) down
	$(MAKE) build

reCleanData:
	$(MAKE) clean
	$(MAKE) build

clean:
	$(MAKE) down
	$(MAKE) cleanShared
	$(MAKE) cleanVolumes

cleanCDN:
	@if [ -d ./services/cdn/public ]; then \
		rm -rf ./services/cdn/public/*.*; \
	fi

