FROM node:18

WORKDIR /app/register-service/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4001

# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]

