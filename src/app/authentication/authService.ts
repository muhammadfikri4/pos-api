import * as bcrypt from 'bcrypt'
import prisma from 'config'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { MESSAGE_CODE } from 'utils/ErrorCode'
import { ENV } from '../../libs'
import { AppError, HttpError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { LoginAuthBodyDTO, RegisterAuthBodyDTO } from './authDTO'
import { authRegisterValidate } from './authValidate'

dotenv.config()

export const registerService = async ({ email, name, password }: RegisterAuthBodyDTO) => {

    const validate = await authRegisterValidate({ email, name, password })
    if ((validate as HttpError)?.message) {
        return AppError((validate as HttpError).message, (validate as HttpError).statusCode, (validate as HttpError).code)
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
        return AppError(MESSAGES.ERROR.NOT_FOUND.USER, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return AppError(MESSAGES.ERROR.INVALID.USER.PASSWORD, 401, MESSAGE_CODE.UNAUTHORIZED)
    }

    const token = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }, ENV.JWT_SECRET as string)

    return token

}