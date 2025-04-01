FROM node:18

WORKDIR /app/user-manager/

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3005

CMD ["npm", "start"]

