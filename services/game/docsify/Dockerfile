FROM node:22-alpine

RUN npm install -g docsify-cli

WORKDIR /docs

COPY docs ./docs

EXPOSE 5009

CMD ["sh", "-c", "cd docs && docsify serve . --port 5009"]

