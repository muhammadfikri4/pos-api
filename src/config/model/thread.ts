import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    thread: {
        type: String,
        required: true
    },
    likeCount: {
        type: Number,
        required: true,
        default: 0
    },
    commentCount: {
        type: Number,
        required: true,
        default: 0
    },
    userId: {
        type: String,
        required: true
    }

}, { timestamps: true })

const ThreadModel = mongoose.model("Thread", userSchema)

export { ThreadModel };
