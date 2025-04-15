FROM node:16 AS backend-build
WORKDIR /usr/src/app
COPY back-end/package.json back-end/package-lock.json ./
RUN npm install
COPY back-end/ ./
EXPOSE 3000

FROM node:16 AS frontend-build
WORKDIR /usr/src/app
COPY front-end/ ./front-end/
RUN npm install -g serve
RUN cp -R front-end /usr/src/app/public

FROM nginx:alpine
COPY --from=backend-build /usr/src/app /usr/src/app
COPY --from=frontend-build /usr/src/app/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
