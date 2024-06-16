import prisma from "../../config"
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { AppError } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { REGEX } from "../../utils/Regex"
import { RegisterAuthBodyDTO } from "./authDTO"

export const authRegisterValidate = async ({ email, password, name }: RegisterAuthBodyDTO) => {
    if (!email) {
        return AppError(MESSAGES.ERROR.REQUIRED.EMAIL, 404, MESSAGE_CODE.NOT_FOUND,)
    }

    if (!password) {
        return AppError(MESSAGES.ERROR.REQUIRED.PASSWORD, 404, MESSAGE_CODE.NOT_FOUND,)
    }

    if (!name) {
        return AppError(MESSAGES.ERROR.REQUIRED.NAME, 404, MESSAGE_CODE.NOT_FOUND,)
    }
    if (!REGEX.email.test(email)) {
        return AppError(MESSAGES.ERROR.INVALID.USER.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const user = await prisma.user.findFirst({ where: { email } })
    if (user) {
        return AppError(MESSAGES.ERROR.ALREADY.USER, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (password.length < 8) {
        return AppError(MESSAGES.ERROR.INVALID.USER.PASSWORD_LENGTH, 400, MESSAGE_CODE.BAD_REQUEST)
    }
}