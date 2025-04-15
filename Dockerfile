# Use an official Node.js image
FROM node:16

# Set working directory for back-end
WORKDIR /usr/src/app

# Copy only back-end package files to install dependencies
COPY back-end/package*.json ./

# Install dependencies
RUN npm install

# Copy back-end source code
COPY back-end/ ./

# Expose app port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
