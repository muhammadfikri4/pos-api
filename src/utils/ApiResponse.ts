import { ResponseInterface } from "@interface/ResponseInterface";

export function ApiResponse<Res = unknown>({ data, status, message }: ResponseInterface<Res>) {
    return {
        status,
        message,
        data
    }
}