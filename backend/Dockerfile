# FROM  production

# ENV NODE_ENV_STAGE="PROD"

# WORKDIR /app

# COPY package*.json ./
# COPY reset.sh ./
# COPY tsconfig.json ./
# # COPY .env ./
# COPY app.ts ./

# RUN npm ci --only=production

# # COPY src/ ./

# CMD [ "node", "app.ts" ]

# STAGE 1
FROM node:16 AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY app.ts ./
COPY ./src ./src

RUN npm config set unsafe-perm true
RUN npm install typescript --location=global
RUN npm install ts-node --location=global
# USER node
RUN npm install
# COPY --chown=node:node . .
RUN npm run build

# STAGE 2
FROM node:16
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY src/prisma ./prisma

ENV NODE_ENV_STAGE="PROD"

# COPY app.ts ./
# USER node
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist

# COPY --chown=node:node .env .
# # COPY --chown=node:node .sequelizerc .
# COPY --chown=node:node  /config ./config
# COPY --chown=node:node  /public ./public


# RUN npm run migrate
# RUN npx sequelize db:seed:all; exit 0
# RUN npm un sequelize-cli

CMD [ "npm", "run", "start:prod"]