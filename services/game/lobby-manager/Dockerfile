# Dockerfile for lobby-manager
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5001
CMD ["npm run dev"]
