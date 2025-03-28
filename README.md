# 🌀 Transcendence

A 3D web game project built with **Babylon.js** using a **microservice architecture** orchestrated with **Docker**.  
The backend is powered by **Node.js** and **Fastify**, with asynchronous communication between services via a **message broker**, and centralized logging using the **ELK stack**.

---

## 📦 Tech Stack

- Frontend: Babylon.js SPA served via Nginx
- Backend: Node.js + Fastify
- API Gateway: Fastify + Docker
- Message Broker: RabbitMQ (or Kafka)
- CDN: Nginx
- Auth: JWT + OAuth2 (Google, GitHub, etc.)
- Logging: ELK (Elasticsearch, Logstash, Kibana)
- Monitoring: Docker healthchecks + auto-restart
- CI/CD: GitHub Actions
- Dev Tools: Makefile for automation

---

## 📁 Project Structure (summary)

Transcendence 
    .github/workflows # CI/CD 
    frontend/ # SPA Babylon.js 
    cdn/ # Assets 3D 
    gateway/ # API Gateway 
    broker/ # RabbitMQ / Kafka 
    elk/ # ELK stack 
    services/ 
    game/ # Game services 
    user/ # Auth & user services 
    stats/ # Analytics / Dashboard 
    docker-compose.yml # Orchestration 
    Makefile # Commandes dev 
    .env # Vars globales

---

## 🚀 Getting Started (Local Dev)

### Requirements

- Docker + Docker Compose
- Node.js ≥ 18 (optional, for local dev outside Docker)
- `make` installed (recommended)

### Quick Start

```bash
# Build and launch all services
make build
make up

