import { getThreadMapper } from "./threadResponse"

export const getThreadService = async () => {
    const threads = await getThreadMapper()
    return threads
}