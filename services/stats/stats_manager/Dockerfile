FROM node:18

WORKDIR /app/stats_manager/

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 6000

CMD ["npm", "start"]

