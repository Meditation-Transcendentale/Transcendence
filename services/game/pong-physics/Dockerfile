FROM node:22-alpine@sha256:dbcedd8aeab47fbc0f4dd4bffa55b7c3c729a707875968d467aaaea42d6225af

WORKDIR /app

COPY package.json ./
COPY .env.example .env
RUN npm install

COPY src ./src
COPY test ./test

EXPOSE 5052

CMD ["npm", "start"]
