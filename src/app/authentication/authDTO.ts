export interface RegisterAuthBodyDTO {
    email: string
    password: string
    name: string
}

export interface LoginAuthBodyDTO {
    email: string
    password: string
}

export interface LoginAuthResponse {
    accessToken: string
}