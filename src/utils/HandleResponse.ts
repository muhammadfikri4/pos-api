import { type Response } from 'express'
import { ApiResponse } from './ApiResponse'

export function HandleResponse<Res = unknown>(
    res: Response,
    status: number,
    code: string,
    message: string,
    data?: Res
) {
    return res.status(status).json(ApiResponse<Res>({ status, message, data, code }))
}