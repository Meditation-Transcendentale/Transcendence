FROM node:22-alpine

WORKDIR /app/stats_database/

COPY package*.json ./

RUN npm install 

COPY . .

CMD ["npm", "start"]

