FROM node:16.10.0 as builder
ARG API_URL

WORKDIR /build

COPY . ./

RUN npm ci
RUN npm run build

FROM node:16.10.0-alpine

WORKDIR /app

ENV CI=true
ENV SERVER_PORT=8080
EXPOSE 8080

COPY --from=builder /build/package*.json ./
COPY --from=builder /build/server.js ./
COPY --from=builder /build/dist/ ./dist

RUN npm ci --only=production --ignore-scripts

CMD node server.js