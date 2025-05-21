
# Stage 1: Build the React app
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Add yarn to the container
RUN apk add --no-cache yarn

# Copy package.json first (no yarn.lock dependency)
COPY package.json ./

# Create a new yarn.lock if it doesn't exist
RUN touch yarn.lock

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the build from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
