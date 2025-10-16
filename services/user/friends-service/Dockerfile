FROM node:22-alpine@sha256:dbcedd8aeab47fbc0f4dd4bffa55b7c3c729a707875968d467aaaea42d6225af

WORKDIR /app/friends-service/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4004

CMD ["npm", "start"]

