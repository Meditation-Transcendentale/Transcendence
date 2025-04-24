FROM node:18

WORKDIR /app/user-database/

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

