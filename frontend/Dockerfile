FROM node:22 AS builder

RUN adduser --disabled-password --uid 101 --gid 101 nginx

USER nginx

WORKDIR /app
COPY package.json tsconfig.json ./
RUN npm install
COPY esbuild.config.mjs ./
# COPY src ./src

CMD ["npm", "run" ,"build"]

FROM nginx:alpine as nginx


WORKDIR /app
# COPY package.json tsconfig.json ./

# RUN apk add --update npm

# RUN npm install

# COPY esbuild.config.mjs ./

# COPY --from=builder /app/dist /usr/share/nginx/html/dist
# COPY public/ /usr/share/nginx/html
# COPY index.html /usr/share/nginx/html/index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 7000

# ENTRYPOINT  ["npm", "run" ,"build", "&"]
CMD ["nginx", "-g", "daemon off;"]
