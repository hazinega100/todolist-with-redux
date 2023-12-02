import axios from "axios";

const settings = {
    withCredentials: true,
    "API-KEY": "9d6d2507-dd03-42c3-a678-bf198d9db789"
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const authApi = {
    logIn(login: any) {
        return instance.post('auth/login', {login: login})
    },
    logOut() {
        return instance.delete('auth/login')
    },
    me() {
        return instance.get('auth/me')
    },
}