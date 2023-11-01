# Use the official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Bundle your app source code into the container
COPY . .

# Expose the port your app runs on
EXPOSE 8081

# Start the application
CMD [ "npm", "start" ]
