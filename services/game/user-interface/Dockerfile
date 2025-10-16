FROM node:24@sha256:377f1c17906eb5a145c34000247faa486bece16386b77eedd5a236335025c2ef

WORKDIR /app

COPY package.json ./
COPY .env.example .env
RUN npm install

COPY src ./src
COPY test ./test

EXPOSE 5051

CMD ["npm", "start"]
