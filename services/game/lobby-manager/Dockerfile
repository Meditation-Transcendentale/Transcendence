# Dockerfile for lobby-manager
FROM node:24-bookworm-slim
WORKDIR /usr/src/app
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm install
COPY src ./src
# COPY . .
EXPOSE 5001
EXPOSE 5011
# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]
