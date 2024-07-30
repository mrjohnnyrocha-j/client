# Use an official Node.js runtime as the base image
FROM node:20.12.2

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Expose the application on port 3000
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
