FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY .env.example .env
RUN npm install

COPY src ./src
COPY test ./test

EXPOSE 5053

CMD ["npm", "run", "dev"]
