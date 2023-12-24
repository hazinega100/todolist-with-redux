import axios from "axios";
import {ResponseType} from "./todolistsApi";

const settings = {
    withCredentials: true,
    "API-KEY": "9d6d2507-dd03-42c3-a678-bf198d9db789"
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

export const authApi = {
    logIn(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId: number }>>("auth/login", data)
    },
    logOut() {
        return instance.delete<ResponseType>("auth/login")
    },
    me() {
        return instance.get<ResponseType<AuthType>>("auth/me")
    },
}

// Type
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

type AuthType = {
    id: number
    email: string
    login: string
}