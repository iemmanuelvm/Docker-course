# BUILDX
# docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 \
#    -t klerith/cron-ticker:latest --push .

# /app /usr /lib
# FROM --platform=linux/amd64 node:19.2-alpine3.16
# FROM --platform=$BUILDPLATFORM node:19.2-alpine3.16

# CAPA 1 Dependencias de desarrollo
FROM node:19.2-alpine3.16 as deps
WORKDIR  /app
COPY package.json ./
RUN npm install


# CAPA 2 build and test
FROM node:19.2-alpine3.16 as builder
WORKDIR /app
# ESTA HACE REFERENCIA AL STAGE ANTERIOR ESTO PARA NO VOLVER INSTALAR LOS NODE_MODULES
COPY source dest --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run test

# CAPA 3 -  Dependencias de produccion
FROM node:19.2-alpine3.16 as prods-deps
WORKDIR /app
COPY package.json ./
RUN npm install --prod

# CAPA 4 EJecutar la app
FROM node:19.2-alpine3.16 as runner
WORKDIR /app
COPY --from=prods-deps /app/node_modules ./node_modules
COPY app.js ./
COPY tasks/ ./tasks
CMD [ "node", "app.js" ]