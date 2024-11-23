# Step 1: Use official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the backend code
COPY . ./

# Expose the backend port
EXPOSE 3000

# Start the backend application
CMD ["node", "index.js"]
