import dotenv from 'dotenv'

dotenv.config()

export const ENV = {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    MIDTRANS_SERVER_KEY: process.env.MIDTRANS_SERVER_KEY,
    MIDTRANS_CLIENT_KEY: process.env.MIDTRANS_CLIENT_KEY
}