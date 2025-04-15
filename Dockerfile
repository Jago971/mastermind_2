FROM node:16

WORKDIR /usr/src/app

# Copy package.json first (for better caching)
COPY back-end/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY back-end/ ./

EXPOSE 3000

CMD ["npm", "start"]