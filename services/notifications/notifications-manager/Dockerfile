# Dockerfile for notifications-manager
FROM node:24-bookworm-slim
WORKDIR /usr/src/app
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 7001
EXPOSE 7011
CMD ["npm", "run", "dev"]

