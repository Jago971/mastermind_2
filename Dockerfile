FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install
COPY back-end/package*.json ./
RUN npm install

# Copy the rest of the app
COPY back-end/ ./

# Expose and run
EXPOSE 3000
CMD ["npm", "start"]
