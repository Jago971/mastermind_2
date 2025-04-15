FROM node:16

WORKDIR /usr/src/app

COPY back-end/package*.json ./back-end/

WORKDIR /usr/src/app/back-end

RUN npm install

COPY back-end/ ./back-end/

WORKDIR /usr/src/app

EXPOSE 3000
