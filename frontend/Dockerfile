FROM node:22-alpine@sha256:dbcedd8aeab47fbc0f4dd4bffa55b7c3c729a707875968d467aaaea42d6225af AS builder

WORKDIR /app

COPY package.json tsconfig.json ./
RUN npm install

COPY esbuild.build.mjs ./esbuild.build.mjs

COPY ./src ./src

RUN npm run build

FROM nginx:alpine AS nginx

WORKDIR /app


COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html/dist

COPY ./public /usr/share/nginx/html/public

EXPOSE 7000

CMD ["nginx", "-g", "daemon off;"]
