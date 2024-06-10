import { ThreadModel } from "@model/thread";
import { UserModel } from "@model/user";

export const getThreadMapper = async () => {
    const threads = await ThreadModel.find()
    const result = await Promise.all(threads.map(async (thread) => {
        const user = await UserModel.findOne({ _id: thread.userId })

        return {
            thread: thread.thread,
            user: {
                id: user?._id,
                name: user?.name
            }
        }
    }))

    return result

}