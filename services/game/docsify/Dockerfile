FROM node:22-alpine@sha256:dbcedd8aeab47fbc0f4dd4bffa55b7c3c729a707875968d467aaaea42d6225af

RUN npm install -g docsify-cli

WORKDIR /docs

COPY docs ./docs

EXPOSE 5009

CMD ["sh", "-c", "cd docs && docsify serve . --port 5009"]

