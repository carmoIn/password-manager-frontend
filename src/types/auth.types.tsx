export type FormRegister = {
    name: string
    email: string
    password: string
}

export type TokenResponse = {
    access_token: string
    refresh_token: string
}

export type FormLogin = {
    username: string
    password: string
}
