import { type Request, type Response } from "express";
import { HttpError } from "../../utils/HttpError";
import { loginService } from "./authService";

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email) {
        return res.status(400).json({ message: "email is required" })
    }

    if (!password) {
        return res.status(400).json({ message: "password is required" })
    }

    const login = await loginService(email, password);
    if ((login as HttpError)?.message) {
        console.log((login as HttpError)?.statusCode)
        return res.status((login as HttpError).statusCode).json({ status: (login as HttpError).statusCode, message: (login as HttpError).message })
    }
    return res.json({ login })
}