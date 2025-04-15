FROM node:16

WORKDIR /usr/src/app

# Copy package.json files
COPY ./back-end/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY ./back-end/ ./

EXPOSE 3000

CMD ["npm", "start"]