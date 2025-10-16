FROM node:22-alpine@sha256:dbcedd8aeab47fbc0f4dd4bffa55b7c3c729a707875968d467aaaea42d6225af

WORKDIR /app/api-gateway/

COPY package*.json /app/api-gateway/

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

