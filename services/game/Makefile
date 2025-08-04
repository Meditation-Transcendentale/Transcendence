

# Bring up the development environment with build
up:
	@docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build

generate:
	@bash ./generate_proto.sh

dev: up

# Stop and remove containers
down:
	@docker compose -f docker-compose.yml -f docker-compose.dev.yml down

# Rebuild images without starting containers
build:
	@docker compose -f docker-compose.yml -f docker-compose.dev.yml build

.PHONY: up
