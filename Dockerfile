FROM node:20.19-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build:core
RUN npm ci --prefix react/demo
RUN npm run build:demo

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/react/demo/dist/ /usr/share/nginx/html/

EXPOSE 80
