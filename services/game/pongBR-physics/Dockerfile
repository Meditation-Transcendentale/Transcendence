FROM node:18

WORKDIR /app

COPY package.json ./
COPY .env.example .env
RUN npm install

COPY src ./src
COPY test ./test

EXPOSE 5053

CMD ["npm", "start"]
