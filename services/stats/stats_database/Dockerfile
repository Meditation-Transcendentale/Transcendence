FROM node:18

WORKDIR /app/stats_database/

COPY package*.json ./

RUN npm install 

COPY . .

CMD ["npm", "start"]

