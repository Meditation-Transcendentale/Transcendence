FROM node:22-alpine

WORKDIR /app/get-info-service/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4005

CMD ["npm", "start"]

