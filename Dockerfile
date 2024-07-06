# Gunakan image node versi 20 sebagai base
FROM node:20

# Install dependencies yang dibutuhkan untuk Bluetooth
RUN apt-get update && apt-get install -y libbluetooth-dev

# Set working directory
WORKDIR /usr/src/app

# Copy package.json dan package-lock.json ke container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code ke working directory
COPY . .

# Install Prisma CLI
RUN npm install @prisma/cli --save-dev

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript code
RUN npm run build

# Expose port 5000
EXPOSE 5000

# Command to run the app
CMD ["node", "dist/index.js"]
