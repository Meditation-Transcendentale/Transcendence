FROM node:24@sha256:377f1c17906eb5a145c34000247faa486bece16386b77eedd5a236335025c2ef

RUN apt-get update && apt-get install -y openssl

WORKDIR /app/database_certs-init/

COPY package*.json ./

RUN npm install 

COPY . .

CMD ["npm", "start"]

