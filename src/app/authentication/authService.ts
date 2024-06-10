import { UserModel } from '@model/user'
import { AppError } from '@utils/HttpError'
import { MESSAGES } from '@utils/Messages'
import { REGEX } from '@utils/Regex'
import * as bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { ENV } from '../../libs'
import { LoginAuthBodyDTO, RegisterAuthBodyDTO } from './authDTO'

dotenv.config()

export const registerService = async ({ email, name, password }: RegisterAuthBodyDTO) => {

    if (!REGEX.email.test(email)) {
        return AppError(MESSAGES.ERROR.INVALID.USER.EMAIL, 400)
    }

    const user = await UserModel.findOne({ email })
    if (user) {
        return AppError(MESSAGES.ERROR.ALREADY.USER.ACCOUNT, 400)
    }

    if (password.length < 8) {
        return AppError(MESSAGES.ERROR.INVALID.USER.PASSWORD_LENGTH, 400)
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await UserModel.create({ name, email, password: hashPassword })
    return newUser

}

export const loginService = async (
    { email, password }: LoginAuthBodyDTO
) => {

    const user = await UserModel.findOne({ email })
    if (!user) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404)
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return AppError(MESSAGES.ERROR.INVALID.USER.PASSWORD, 401)
    }

    const token = jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }, ENV.JWT_SECRET as string)

    return token

}