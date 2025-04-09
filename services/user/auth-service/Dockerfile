FROM node:18

WORKDIR /app/auth-service/

COPY package*.json /app/auth-service/

RUN npm install 

COPY . .

EXPOSE 4002

# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]

