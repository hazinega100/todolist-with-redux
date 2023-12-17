import {Dispatch} from "redux";
import {setError, setStatus} from "./app-reducer";
import {authApi, LoginParamsType} from "../../api/authApi";

const initState: InitStateType = {
    isLoggedIn: false,
    user: null
}

export const authReducer = (state = initState, action: ActionType): InitStateType => {
    switch (action.type) {
        case 'AUTH/LOGIN': {
            return {...state, isLoggedIn: action.login}
        }
        case "AUTH/USER": {
            return {...state, user: action.user}
        }
        default: {
            return state
        }
    }
}

// actions
export const setLogin = (login: boolean) => {
    return {
        type: 'AUTH/LOGIN',
        login
    } as const
}
export const setUser = (user: string) => {
    return {
        type: 'AUTH/USER',
        user
    } as const
}

// thank
export const setIsLoggedInTC = (values: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    authApi.logIn(values)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setStatus('idle'))
                dispatch(setLogin(true))
            }
        })
        .catch(error => {
            dispatch(setError(error))
        })
}

export const setIsMeTC = () => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    authApi.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setStatus('idle'))
                dispatch(setLogin(true))
                dispatch(setUser(res.data.data.login))
            } else {
                dispatch(setError(res.data.messages[0]))
                dispatch(setStatus('failed'))
            }
        })
        .catch(error => {
            dispatch(setError(error))
        })
}

export const setLogOutTC = () => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    authApi.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setStatus('idle'))
                dispatch(setLogin(false))
            }
        })
        .catch(error => {
            dispatch(setError(error))
        })
}

// types
export type InitStateType = {
    isLoggedIn: boolean
    user: string | null
}
export type LoginType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean
}

type ActionType = SetLoginType | SetUserType
type SetLoginType = ReturnType<typeof setLogin>
type SetUserType = ReturnType<typeof setUser>