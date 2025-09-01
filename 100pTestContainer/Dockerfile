FROM node:22-alpine

WORKDIR /app/hundredPlayersTest/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3500

CMD ["npm", "start"]

