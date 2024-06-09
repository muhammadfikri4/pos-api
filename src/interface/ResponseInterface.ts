export interface ResponseInterface<Res = unknown> {
    status: number,
    data?: Res,
    message: string
}