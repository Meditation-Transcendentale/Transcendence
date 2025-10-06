FROM node:22-alpine

WORKDIR /app/api-gateway/

COPY package*.json /app/api-gateway/

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

