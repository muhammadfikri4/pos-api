import { UserModel } from '@model/user'
import { AppError } from '@utils/HttpError'
import { RegisterAuthBodyDTO } from './authDTO'


export const registerService = async ({ email, name, password }: RegisterAuthBodyDTO) => {
    const user = await UserModel.findOne({ email })
    if (user) {
        return AppError('user already exist', 409)
    }
}

export const loginService = async (
    email: string,
    password: string
) => {
    const user = await UserModel.findOne({ email })
    if (!user) {
        return AppError('user not found', 404)
    }

    if (user.password !== password) {
        return AppError('wrong password', 401)
    }
    return user

}