FROM node:18-alpine

# Expose the application port
EXPOSE 3000

# Set the working directory
WORKDIR /app

# Set the environment to production
ENV NODE_ENV=production

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json* ./

# Install production dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Remove CLI packages if not needed in production
RUN npm remove @shopify/cli

# Copy the entire application code into the container
COPY . .

# Ensure the prisma directory and schema file are available
RUN [ -d prisma ] && [ -f prisma/sqlite.prisma ] || (echo "Prisma directory or schema file not found!" && exit 1)

# Run Prisma generate to create the client
RUN npx prisma generate

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "run", "docker-start"]
