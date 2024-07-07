# Gunakan image Node.js sebagai base image
FROM node:18

# Set work directory
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file ke dalam container
COPY . .

# Generate prisma
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 5000

# Jalankan aplikasi
CMD [ "node", "dist/index.js" ]
