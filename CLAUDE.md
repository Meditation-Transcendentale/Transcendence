# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Docker & Services
- `make re` - Rebuild and restart all services (most common command)
- `make build` - Build and start all services
- `make down` - Stop all services
- `make up` - Start existing services
- `make clean` - Stop services and remove volumes/shared data
- `make TARGET=<service> build` - Build specific service (user/stats/frontend/game)

### Frontend Development
- `cd frontend && npm run dev` - Start Vite dev server with hot reload
- `cd frontend && npm run build-nginx` - Build for production (TypeScript + esbuild)
- `cd frontend && npm run watch` - Watch mode for development

### Testing
- `cd services/game/pong-physics && npm test` - Run vitest tests for physics engine
- `cd services/game/lobby-manager && npm test` - Run Jest tests for lobby manager
- `docker compose exec <service> npm test` - Run tests inside container

## Architecture Overview

### Microservice Communication
- **Message Broker**: NATS for inter-service communication
- **Protocol Buffers**: Used for game state serialization (see `proto/` directories)
- **WebSockets**: Real-time game communication via uWebSockets.js

### Frontend Architecture
- **3D Engine**: Babylon.js with custom ECS (Entity Component System)
- **Game Types**: Regular Pong, PongBR (Battle Royale), Brick Breaker
- **SPA**: Custom router in `src/spa/Router.ts`, no framework dependencies
- **Build**: TypeScript + esbuild, served via Nginx

### Game Systems
Each game implements ECS pattern:
- **Components**: Data containers (`components/` directories)
- **Systems**: Logic processors (`systems/` directories) 
- **Templates**: Entity builders (`templates/` directories)
- **Physics**: Separate microservices (pong-physics, pongBR-physics)

### Service Structure
- `services/game/`: Game logic, lobby management, physics engines
- `services/user/`: Authentication, user management, friends
- `services/stats/`: Match statistics and analytics
- `gateway/`: API gateway with Fastify
- `frontend/`: Babylon.js client application

## Key Patterns

### State Management
- Frontend uses custom StateManager classes for each game
- Game state synchronized via Protocol Buffers over WebSocket
- Physics runs server-side, client receives authoritative updates

### Authentication
- JWT tokens for session management
- OAuth2 integration (Google auth in auth-service)
- User database via SQLite (better-sqlite3)

### Real-time Features
- WebSocket connections managed by user-interface service
- NATS pub/sub for service coordination
- Prometheus metrics collection across services

## Important Files
- `docker-compose.yml` - Main service orchestration
- `frontend/src/main.ts` - Frontend entry point
- `services/game/proto/` - Shared protocol definitions
- `config/games/` - Game configuration files (pong.yaml, pongBR.yaml)
- `.env` - Environment configuration (updated by Makefile)