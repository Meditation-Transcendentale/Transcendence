FROM node:18

WORKDIR /app/doc-service/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3004

# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]

