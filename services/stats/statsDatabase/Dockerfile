FROM node:18

WORKDIR /app/statsDatabase/

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 6001

CMD ["npm", "start"]

