# 🕹️ Transcendence – Microservices Game Platform

Welcome to the **Transcendence** project! This repository is a full-stack multiplayer game platform built with a microservice architecture using **Docker**, **Node.js**, **NATS**, and **Babylon.js** for the 3D frontend.

---

## 📦 Stack Overview

| Layer         | Tech                   |
|---------------|-------------------------|
| Frontend      | Babylon.js + Nginx      |
| API Gateway   | Node.js + Fastify       |
| Message Broker| NATS                    |
| Game Services | Node.js Microservices   |
| Auth          | JWT / OAuth2 (planned)  |
| Logging       | ELK Stack (planned)     |
| CI/CD         | GitHub Actions + Docker |

---

## 🧱 Project Structure

```
Transcendence/
├── frontend/              # Babylon.js SPA (served via Nginx)
├── services/
│   ├── game/              # Game-related microservices
│   ├── user/              # User management microservices
│   └── stats/             # Stats & dashboard services
├── gateway/               # API Gateway (Fastify + NATS)
├── docker-compose.yml     # Production stack
├── docker-compose.dev.yml # Dev stack with hot reload
├── Makefile               # Developer commands
├── README.md              # This file
├── CONTRIBUTING.md        # Dev & contribution guide
└── FEATURES.md            # Architecture & service checklist
```

---

## 🚀 Get Started

```bash
# Clone the project
$ git clone https://github.com/your-org/transcendence.git
$ cd transcendence

# Start dev environment
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

---

## 🧪 Testing

Each service uses `vitest` for unit testing:

```bash
cd services/game/pong-physics
npm test
```

Or use `docker compose exec`:

```bash
docker compose exec pong-physics npm test
```

---

## 🛠 Dev Shortcuts

```bash
make dev         # Run dev stack
make prod        # Run prod stack
make logs        # Tail all logs
make test        # Run tests on all services

```

## Port

```
API - 3000-3000
DocApi - 3001-3001

Register Service - 4001-4001
Auth Service - 4002-4002
Update User Infos Service - 4003-4003
```



