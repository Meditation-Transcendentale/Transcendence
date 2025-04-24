FROM node:18

WORKDIR /app/get-info-service/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4005

CMD ["npm", "start"]

