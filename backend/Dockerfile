
# Build stage
FROM golang:1.20-alpine AS build

# Set working directory
WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the source code
COPY . .

# Build the application with proper flags
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Final stage
FROM alpine:latest

WORKDIR /app

# Copy binary from build stage
COPY --from=build /app/main .

# Add CA certificates for HTTPS requests
RUN apk --no-cache add ca-certificates

# Make sure the binary is executable
RUN chmod +x /app/main

# Expose port
EXPOSE 8080

# Command to run the executable
CMD ["/app/main"]
