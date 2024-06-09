import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config()
const mongoURI = process.env.DB_URL

mongoose.set('strictQuery', true)

export const dbconect = async () => {
    try {
        await mongoose.connect(mongoURI as string)
        console.log("DB connected🚀")
    } catch (error: unknown) {
        console.log((error as unknown as any).message)
    }
}
// mongodb + srv://muhfikriantoaji:muhfikri04@cluster0.rupsheq.mongodb.net/