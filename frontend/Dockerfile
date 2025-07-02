FROM node:22 AS builder

WORKDIR /app
COPY package.json tsconfig.json ./
COPY esbuild.config.mjs ./
COPY src ./src
RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html/dist
COPY public/ /usr/share/nginx/html
COPY index.html /usr/share/nginx/html/index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 7000
CMD ["nginx", "-g", "daemon off;"]
