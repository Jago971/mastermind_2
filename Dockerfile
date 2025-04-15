FROM node:16 AS backend

WORKDIR /app

COPY back-end/package.json back-end/package-lock.json ./
RUN npm install

COPY back-end/ .

FROM node:16 AS frontend

WORKDIR /app

COPY front-end/package.json front-end/package-lock.json ./
RUN npm install

COPY front-end/ .

RUN npm run build

FROM nginx:alpine

COPY --from=frontend /app/build /usr/share/nginx/html

COPY --from=backend /app /app

EXPOSE 80
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
