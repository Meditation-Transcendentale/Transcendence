FROM node:18

WORKDIR /app/api-gateway/

COPY package*.json /app/api-gateway/

RUN npm install 

COPY . .

EXPOSE 3000

# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]

