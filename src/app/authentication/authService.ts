import * as bcrypt from 'bcrypt'
import prisma from 'config'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { ENV } from '../../libs'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { REGEX } from '../../utils/Regex'
import { LoginAuthBodyDTO, RegisterAuthBodyDTO } from './authDTO'

dotenv.config()

export const registerService = async ({ email, name, password }: RegisterAuthBodyDTO) => {

    if (!REGEX.email.test(email)) {
        return AppError(MESSAGES.ERROR.INVALID.USER.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const user = await prisma.user.findFirst({ where: { email } })
    if (user) {
        return AppError(MESSAGES.ERROR.ALREADY.USER.ACCOUNT, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (password.length < 8) {
        return AppError(MESSAGES.ERROR.INVALID.USER.PASSWORD_LENGTH, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const data = {
        name, email, password: hashPassword
    }
    const newUser = await prisma.user.create({
        data
    })
    return newUser

}

export const loginService = async (
    { email, password }: LoginAuthBodyDTO
) => {

    const user = await prisma.user.findFirst({ where: { email } })
    if (!user) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, "NOT FOUND")
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return AppError(MESSAGES.ERROR.INVALID.USER.PASSWORD, 401, "NOT FOUND")
    }

    const token = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
    }, ENV.JWT_SECRET as string)

    return token

}