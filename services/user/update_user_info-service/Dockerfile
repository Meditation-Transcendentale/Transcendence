FROM node:18

WORKDIR /app/update_user_info-service/

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 4003

# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]

