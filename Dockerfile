# Gunakan image node versi 20 sebagai base
FROM node:20

# Install dependencies yang dibutuhkan untuk Bluetooth
RUN apt-get update && apt-get install -y libbluetooth-dev

# Set working directory
WORKDIR /usr/src/app

# Copy package.json dan yarn.lock ke container
COPY package.json yarn.lock ./

# Install dependencies menggunakan yarn
RUN yarn install

# Copy seluruh source code ke working directory
COPY . .

# Install Prisma CLI
RUN yarn add @prisma/cli --dev

# Generate Prisma client
RUN yarn prisma generate

# Build TypeScript code
RUN yarn build

# Expose port 5000
EXPOSE 5000

# Command to run the app
CMD ["node", "dist/index.js"]
