import { HandleResponse } from "@utils/HandleResponse";
import { HttpError } from "@utils/HttpError";
import { MESSAGES } from "@utils/Messages";
import { type Request, type Response } from "express";
import { LoginAuthResponse } from "./authDTO";
import { loginService, registerService } from "./authService";

export const registerController = async (req: Request, res: Response) => {

    const { name, email, password } = req.body

    if (!email) {
        return HandleResponse(res, 404, MESSAGES.ERROR.NOT_FOUND.USER.EMAIL)
    }

    if (!password) {
        return HandleResponse(res, 404, MESSAGES.ERROR.NOT_FOUND.USER.PASSWORD)
    }

    if (!name) {
        return HandleResponse(res, 404, MESSAGES.ERROR.NOT_FOUND.USER.NAME)
    }
    const register = await registerService({ name, email, password });

    if ((register as HttpError)?.message) {
        return HandleResponse(res, (register as HttpError).statusCode, (register as HttpError).message)
    }
    HandleResponse(res, 201, MESSAGES.CREATED.USER.ACCOUNT)
}

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email) {
        return HandleResponse(res, 404, MESSAGES.ERROR.NOT_FOUND.USER.EMAIL)
    }

    if (!password) {
        return HandleResponse(res, 404, MESSAGES.ERROR.NOT_FOUND.USER.PASSWORD)
    }

    const login = await loginService({ email, password });
    if ((login as HttpError)?.message) {
        return HandleResponse(res, (login as HttpError).statusCode, (login as HttpError).message)
    }
    HandleResponse<LoginAuthResponse>(res, 200, MESSAGES.SUCCESS.USER, { access_token: login as string })
}