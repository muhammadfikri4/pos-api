
export interface HttpError extends Error {
    statusCode: number;
    message: string
}

export const AppError = (message: string, statusCode: number) => {
    const error = new Error() as HttpError
    error.statusCode = statusCode;
    error.message = message
    return error;
}