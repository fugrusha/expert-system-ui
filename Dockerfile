# Use an official Node.js runtime as the base image
FROM node:18 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the Angular app
RUN npm run build

# Use a smaller, production-ready image
FROM nginx:alpine

# Copy the built app files from the previous stage
COPY --from=builder /app/dist/expert-system-frontend /usr/share/nginx/html

# Expose the port that Nginx will listen on
EXPOSE 80

# Command to start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
