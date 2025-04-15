# Use an official Node.js runtime as a base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files first to leverage Docker caching
COPY back-end/package*.json ./back-end/

# Set working directory to back-end so npm install runs correctly
WORKDIR /usr/src/app/back-end

# Install dependencies (including express)
RUN npm install

# Copy the entire back-end folder (including server.js and other files)
COPY back-end/ ./back-end/

# Go back to root app directory for consistent CMD behavior
WORKDIR /usr/src/app

# Expose the port your app runs on
EXPOSE 3000

RUN npm list express

# Start the app
CMD ["node", "back-end/server.js"]
