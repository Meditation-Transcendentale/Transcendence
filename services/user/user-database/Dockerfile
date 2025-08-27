FROM node:22-alpine

WORKDIR /app/user-database/

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

