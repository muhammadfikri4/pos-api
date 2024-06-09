import dotenv from 'dotenv'

dotenv.config()

export const ENV = {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET
}