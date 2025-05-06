FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Expose the port your app runs on (default for NestJS is 3000)
EXPOSE 5000

# Start the application in production mode
CMD ["npm", "run", "start:prod"]