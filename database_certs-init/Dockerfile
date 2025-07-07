FROM node:22

RUN apt-get update && apt-get install -y openssl

WORKDIR /app/database_certs-init/

COPY package*.json ./

RUN npm install 

COPY . .

CMD ["npm", "start"]

