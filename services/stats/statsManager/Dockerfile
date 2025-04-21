FROM node:18

WORKDIR /app/statsManager/

COPY package*.json ./

RUN npm install 

COPY . .

CMD ["npm", "start"]


