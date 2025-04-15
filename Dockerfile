FROM node:16

WORKDIR /usr/src/app

COPY back-end/package*.json ./
RUN npm install

COPY back-end/ .

EXPOSE 3000

CMD ["npm", "start"]
