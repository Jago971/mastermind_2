# Use an official Node.js runtime as a base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the entire back-end folder (including package.json and server.js)
COPY back-end/ ./back-end/

# Set working directory to back-end so npm install runs correctly
WORKDIR /usr/src/app/back-end

# Install dependencies
RUN npm install

# Go back to root app directory for consistent CMD behavior
WORKDIR /usr/src/app

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["node", "back-end/server.js"]
