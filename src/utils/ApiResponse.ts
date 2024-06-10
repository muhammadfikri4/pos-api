import { ResponseInterface } from "../interface/ResponseInterface";

export function ApiResponse<Res = unknown>({ data, status, message, code }: ResponseInterface<Res>) {
    return {
        status,
        code,
        message,
        data
    }
}