FROM node:18

WORKDIR /app/statsDatabase/

COPY package*.json ./

RUN npm install 

COPY . .

CMD ["npm", "start"]


