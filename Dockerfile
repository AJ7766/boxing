# Use an official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /workspace

# Install dependencies (copy package*.json first for efficient layer caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Run the app
CMD ["npm", "run", "dev"]
