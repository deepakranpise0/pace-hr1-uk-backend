# Use official Node.js image as base
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --f

# Copy the rest of the application
COPY . .

# Expose port 3000
EXPOSE 3000

# Start NestJS server
CMD ["npm", "run", "start"]
