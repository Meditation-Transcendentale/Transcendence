FROM node:24

WORKDIR /app

COPY package.json ./
COPY .env.example .env
RUN npm install

COPY src ./src
COPY test ./test

EXPOSE 5051

CMD ["npm", "start"]
