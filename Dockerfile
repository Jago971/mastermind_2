FROM node:16

WORKDIR /usr/src/app

COPY back-end/package.json back-end/package-lock.json ./
RUN npm install

COPY back-end/ ./
COPY front-end/ ./public/

EXPOSE 3000

CMD ["node", "server.js"]
