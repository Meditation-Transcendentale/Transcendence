# Dockerfile for notifications-manager
FROM node:24-bookworm-slim@sha256:c0eadb278e6b0b608681b359291592692979133567710eaa703d6f989f33c6c1
WORKDIR /usr/src/app
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 7001
EXPOSE 7011
# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]

