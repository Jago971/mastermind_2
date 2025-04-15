FROM node:16

WORKDIR /usr/src/app/back-end

COPY back-end/package.json back-end/package-lock.json ./

RUN npm install

COPY back-end/ ./

WORKDIR /usr/src/app

COPY front-end/ ./public/

EXPOSE 3000

CMD ["node", "back-end/server.js"]
