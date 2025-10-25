# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM node:18-alpine
WORKDIR /app

# Install 'serve' to serve static files
RUN npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Cloud Run expects this environment variable
ENV PORT 8080
EXPOSE 8080

# Serve the static frontend on port 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
