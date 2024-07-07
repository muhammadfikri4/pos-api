# Gunakan image Node.js sebagai base image
FROM node:18
# Set work directory
WORKDIR /src

# Salin package.json dan yarn.lock
COPY package.json yarn.lock ./

# Install dependencies menggunakan Yarn
RUN yarn install

# Salin semua file ke dalam container
COPY . .

# Build TypeScript
RUN yarn build

# Expose port
EXPOSE 5000

# Jalankan aplikasi
CMD [ "node", "dist/index.js" ]
