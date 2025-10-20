# Transcendence

A full-stack multiplayer game platform featuring real-time Pong gameplay with Battle Royale mode, tournaments, solo Brick Breaker, and a complete social system. Built with a microservices architecture using Docker, Node.js, and modern web technologies.

## Features

- **Multiple Game Modes**
  - Classic 1v1 Pong
  - Pong Battle Royale
  - Tournament System
  - Brick Breaker (Solo game with difficulty levels)
  - AI Opponent

- **Social Features**
  - User Authentication & Profiles
  - Friends System
  - Real-time Notifications
  - Player Statistics & Leaderboards

- **Technical Highlights**
  - Microservices Architecture
  - Real-time Communication via NATS
  - 3D Graphics powered by Babylon.js
  - Docker-based Deployment

## Games

### Pong
Classic multiplayer Pong with modern 3D graphics. Play against friends or AI opponents in real-time matches.

### Pong Battle Royale
An innovative multiplayer Battle Royale version of Pong where multiple players compete simultaneously until only one remains.

### Brick Breaker
A solo arcade game with three difficulty modes (Easy, Normal, Hard). Break bricks with a paddle and ball, featuring:
- Personal best tracking for each difficulty
- Global leaderboards
- Score system
- Physics-based gameplay in 3D

### Tournament Mode
Organize and participate in brackets-style tournaments with multiple players competing for the top spot.

## Tech Stack

| Component      | Technology                |
|----------------|---------------------------|
| Frontend       | Babylon.js, TypeScript    |
| API Gateway    | Node.js, Fastify          |
| Message Broker | NATS                      |
| Database       | PostgreSQL                |
| Web Server     | Nginx                     |
| Containerization | Docker, Docker Compose |

## Project Structure

```
Transcendence/
├── frontend/                    # Babylon.js 3D frontend
│   ├── src/
│   │   ├── game/
│   │   │   ├── pong/           # Pong game logic
│   │   │   ├── brickbreaker/   # Brick Breaker game
│   │   │   │   ├── brickbreaker.ts  # Main game logic
│   │   │   │   ├── Player.ts        # Paddle controller
│   │   │   │   ├── Ball.ts          # Ball physics
│   │   │   │   └── Arena.ts         # Arena & bricks
│   │   │   ├── GameManager.ts  # Game orchestration
│   │   │   └── GameUI.ts       # UI components
│   │   ├── scene/              # 3D scene management
│   │   └── route/              # Frontend routing
│   └── public/                 # Static assets
├── gateway/                     # API Gateway (Fastify)
├── services/
│   ├── game/
│   │   ├── pong-physics/        # Classic pong physics engine
│   │   ├── pongBR-physics/      # Battle Royale physics engine
│   │   ├── game-manager/        # Game session management
│   │   ├── lobby-manager/       # Matchmaking & lobbies
│   │   ├── tournament/          # Tournament system
│   │   ├── user-interface/      # Game UI service
│   │   ├── ai/                  # AI opponent logic
│   │   └── docsify/             # Game documentation
│   ├── user/
│   │   ├── auth-service/        # Authentication
│   │   ├── register-service/    # User registration
│   │   ├── get-info-service/    # User profile retrieval
│   │   ├── update_user_info-service/  # Profile updates
│   │   ├── friends-service/     # Friends management
│   │   └── user-database/       # User data storage
│   ├── stats/                   # Statistics & leaderboards
│   ├── notifications/           # Real-time notifications
│   └── cdn/                     # Static asset delivery
├── shared/                      # Shared utilities & types
├── packages/proto/              # Protocol buffers definitions
├── docker-compose.yml           # Main compose configuration
├── docker-compose_test.yml      # Test environment setup
└── Makefile                     # Build automation
```

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local development)
- Make (optional, for easier commands)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Meditation-Transcendentale/Transcendence.git
   cd Transcendence
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start the application**
   ```bash
   make build
   # OR
   docker compose -f docker-compose.yml \
                  -f ./services/stats/docker-compose-stats.yml \
                  -f ./frontend/docker-compose.yml \
                  -f ./services/game/docker-compose.dev.yml \
                  up --build
   ```

4. **Access the application**
   - Frontend: `http://localhost` (configured via nginx)
   - API Gateway: `http://localhost:3000`
   - API Documentation: `http://localhost:3001`

## Development

### Make Commands

```bash
# Start all services
make build              # Build and start all services
make up                 # Start services (without rebuild)
make down               # Stop all services
make stop               # Stop services without removing containers
make re                 # Restart all services

# Targeted builds
make build TARGET=user      # Build only user services
make build TARGET=game      # Build only game services
make build TARGET=stats     # Build only stats services
make build TARGET=frontend  # Build only frontend

# Testing
make build TEST=true        # Build with test configuration
make filldb                 # Fill database with test data

# Cleanup
make clean                  # Stop services and clean volumes
make cleanVolumes           # Remove Docker volumes
make cleanShared            # Remove shared directory
make cleanCDN               # Clean CDN public files
make reCleanData            # Full clean and rebuild
```

### Service Ports

| Service                    | Port  |
|----------------------------|-------|
| API Gateway                | 3000  |
| API Documentation          | 3001  |
| Register Service           | 4001  |
| Auth Service               | 4002  |
| Update User Info Service   | 4003  |
| Get Info Service           | 4004  |
| Friends Service            | 4005  |
| Stats Services             | 5xxx  |
| Game Services              | 6xxx  |

### Running Individual Services

```bash
# User services only
make build TARGET=user

# Game services only
make build TARGET=game

# Stats services only
make build TARGET=stats

# Frontend only
make build TARGET=frontend
```

### Development Workflow

1. **Make changes** to your service code
2. **Rebuild** the specific service:
   ```bash
   docker compose up --build <service-name>
   ```
3. **View logs**:
   ```bash
   docker compose logs -f <service-name>
   ```

### Protocol Buffers

If you modify `.proto` files in `packages/proto/`, regenerate the code:

```bash
cd services/game
./generate_proto.sh
```

## Testing

Each microservice can be tested independently:

```bash
# Test a specific service
cd services/game/pong-physics
npm test

# Or via docker compose
docker compose exec pong-physics npm test
```

To run the full stack in test mode:

```bash
make build TEST=true
```

## Architecture

### Microservices Communication

- **NATS Message Broker**: Services communicate via NATS for pub/sub and request/reply patterns
- **API Gateway**: Centralized entry point for frontend requests
- **Protocol Buffers**: Efficient serialization for service-to-service communication

### Game Architecture

#### Multiplayer Games (Pong, Battle Royale, Tournaments)
1. **Lobby Manager**: Handles matchmaking and game session creation
2. **Game Manager**: Orchestrates game sessions and state
3. **Physics Engines**: Calculate game physics (separate engines for classic and BR modes)
4. **User Interface Service**: Manages game UI state and updates
5. **Tournament Service**: Handles tournament brackets and progression

#### Solo Game (Brick Breaker)
- Runs entirely client-side in the Babylon.js frontend
- Communicates with stats service for leaderboards and personal bests
- Three difficulty levels with separate scoring systems

### User Services

- **Auth Service**: JWT-based authentication
- **Register Service**: New user registration and validation
- **User Database**: PostgreSQL database for user data persistence
- **Friends Service**: Friend requests and relationships
- **Get/Update Info Services**: Profile management

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the 42 School curriculum.

## Links

- **Repository**: https://github.com/Meditation-Transcendentale/Transcendence
- **Issues**: https://github.com/Meditation-Transcendentale/Transcendence/issues
