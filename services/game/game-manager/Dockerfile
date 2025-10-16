FROM node:24-bookworm-slim@sha256:c0eadb278e6b0b608681b359291592692979133567710eaa703d6f989f33c6c1

WORKDIR /app

COPY package.json ./
COPY .env.example .env
RUN npm install

COPY src ./src
COPY test ./test

EXPOSE 5050

CMD ["npm", "start"]
