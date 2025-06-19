FROM node:24-bookworm-slim
WORKDIR /usr/src/app
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5009
EXPOSE 5019
CMD ["npm", "run", "dev"]
