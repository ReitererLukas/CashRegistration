# build the project
FROM node:16 AS builder
WORKDIR /app

COPY cash_frontend/package.json .
COPY cash_frontend .

RUN npm install
RUN npm install --location=global @vue/cli
RUN npm run build

# deployment part - without ssl certificate
# automated ssl can be added with certbot
FROM nginx:1.23.0 AS deployment
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html