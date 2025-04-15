# Use an official Node.js runtime as a base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if you have it) into the container
COPY back-end/package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Expose the port your app will run on (adjust if needed)
EXPOSE 3000

# Set environment variables (you could also pass these during runtime)
ENV DB_HOST=your-db-host
ENV DB_USER=your-db-user
ENV DB_PASSWORD=your-db-password
ENV DB_NAME=your-db-name
ENV DB_PORT=3306

# Command to run your app
CMD ["node", "back-end/server.js"]