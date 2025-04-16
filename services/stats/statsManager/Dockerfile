FROM node:18

WORKDIR /app/statsManager/

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 6000

CMD ["npm", "start"]

