# Build stage
FROM node:20.12.2 AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire application source
COPY . .

# Build the application
RUN npm run build

# Run stage
FROM node:20.12.2 AS run

WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/package.json /app/package-lock.json ./

# Install only production dependencies
RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "start"]
