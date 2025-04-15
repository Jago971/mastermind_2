FROM node:16 AS backend-build
WORKDIR /usr/src/app
COPY back-end/package.json back-end/package-lock.json ./
RUN npm install
COPY back-end/ ./
EXPOSE 3000

FROM node:16 AS frontend-build
WORKDIR /usr/src/app
COPY front-end/package.json front-end/package-lock.json ./
RUN npm install -g serve
COPY front-end/ ./front-end/
RUN cp -R front-end /usr/src/app/public

FROM node:16
WORKDIR /usr/src/app
COPY --from=backend-build /usr/src/app /usr/src/app
COPY --from=frontend-build /usr/src/app/public /usr/src/app/public
WORKDIR /usr/src/app/front-end
RUN npm run build
RUN npm install -g pm2
EXPOSE 3000 8080
CMD pm2 start /usr/src/app/server.js --name "backend" && pm2 serve /usr/src/app/public 8080 --name "frontend" && pm2 logs
