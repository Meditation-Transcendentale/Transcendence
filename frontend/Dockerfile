FROM node:22-alpine AS builder

# RUN adduser --disabled-password --uid 101 --gid 101 nginx

# USER nginx


WORKDIR /app

COPY package.json tsconfig.json ./
RUN npm install
COPY esbuild.config.mjs ./
COPY esbuild.watch.mjs ./


COPY ./src ./src

EXPOSE 7070
# RUN npm run build

CMD ["npm", "run" ,"watch"]




FROM nginx:alpine AS nginx

WORKDIR /app

# USER nginx

COPY package.json tsconfig.json ./


# COPY --from=builder /app/dist /usr/share/nginx/html/dist
COPY public/ /usr/share/nginx/html
COPY index.html /usr/share/nginx/html/index.html
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 7000
CMD ["nginx", "-g", "daemon off;"]
