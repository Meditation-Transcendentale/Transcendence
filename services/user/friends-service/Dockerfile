FROM node:22-alpine

WORKDIR /app/friends-service/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4004

CMD ["npm", "start"]

