import { ApiResponse } from "@utils/ApiResponse";
import { HttpError } from "@utils/HttpError";
import { MESSAGES } from "@utils/Messages";
import { type Request, type Response } from "express";
import { LoginAuthResponse } from "./authDTO";
import { loginService, registerService } from "./authService";

export const registerController = async (req: Request, res: Response) => {

    const { name, email, password } = req.body

    if (!email) {
        return res.status(404).jsonp(ApiResponse({ status: 404, message: MESSAGES.ERROR.NOT_FOUND.USER.EMAIL }))
    }

    if (!password) {
        return res.status(404).jsonp(ApiResponse({ status: 404, message: MESSAGES.ERROR.NOT_FOUND.USER.PASSWORD }))
    }

    if (!name) {
        return res.status(404).jsonp(ApiResponse({ status: 404, message: MESSAGES.ERROR.NOT_FOUND.USER.NAME }))
    }
    const register = await registerService({ name, email, password });

    if ((register as HttpError)?.message) {
        return res.status((register as HttpError).statusCode).jsonp({ status: (register as HttpError).statusCode, message: (register as HttpError).message })
    }
    return res.status(201).jsonp(ApiResponse({ status: 201, message: MESSAGES.CREATED.USER.ACCOUNT }))
}

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email) {
        return res.status(404).jsonp(ApiResponse({ status: 404, message: MESSAGES.ERROR.NOT_FOUND.USER.EMAIL }))
    }

    if (!password) {
        return res.status(404).jsonp(ApiResponse({ status: 404, message: MESSAGES.ERROR.NOT_FOUND.USER.PASSWORD }))
    }

    const login = await loginService({ email, password });
    if ((login as HttpError)?.message) {
        return res.status((login as HttpError).statusCode).jsonp({ status: (login as HttpError).statusCode, message: (login as HttpError).message })
    }
    return res.status(200).jsonp(ApiResponse<LoginAuthResponse>(
        {
            data: {
                access_token: login as string
            },
            status: 200,
            message: MESSAGES.SUCCESS.USER
        }))
}