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
    logIn(email: string, password: string) {
        return instance.post<ResponseType<{ userId: number }>>("auth/login", {email, password})
    },
    logOut() {
        return instance.delete("auth/login")
    },
    me() {
        return instance.get("auth/me")
    },
}