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
    access_token: string
}