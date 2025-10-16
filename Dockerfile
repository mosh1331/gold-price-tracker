# Use the official Playwright image (includes Chromium, Firefox, WebKit)
FROM mcr.microsoft.com/playwright:v1.56.0-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (production only)
RUN npm ci --only=production

# Copy the rest of your app
COPY . .

# Expose the app port
EXPOSE 3000

# Start the server
CMD ["node", "index.js"]

