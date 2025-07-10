FROM node:24-bookworm-slim

WORKDIR /app

COPY package.json ./
COPY .env.example .env
RUN npm install

COPY src ./src
COPY test ./test

EXPOSE 5050

CMD ["npm", "start"]
