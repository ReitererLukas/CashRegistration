FROM node:16 AS development

WORKDIR /app

COPY docker-init.sh /scripts/docker-init.sh

EXPOSE 8080

ENTRYPOINT /scripts/docker-init.sh


# build the project
FROM development AS build
WORKDIR /app

COPY cash_frontend/package.json .
COPY cash_frontend .

RUN npm install
RUN npm install -g @vue/cli
RUN npm run build

# deployment part
FROM nginx AS deployment
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
EXPOSE 443