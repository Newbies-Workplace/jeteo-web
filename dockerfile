FROM node:16.10.0-alpine

LABEL org.opencontainers.image.source=https://github.com/Newbies-Workplace/jeteo


WORKDIR /app

ENV CI=true
ENV SERVER_PORT=8080
EXPOSE 8080


COPY package*.json .
COPY server.js .
COPY . .

RUN npm ci --only=production --ignore-scripts


CMD node server.js