import {Dispatch} from "redux";
import {setError, setAppStatus} from "./app-reducer";
import {authApi, LoginParamsType} from "../../api/authApi";
import {logoutAppAC} from "./todolist-reducer";

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

// thunks
export const setIsLoggedInTC = (values: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    authApi.logIn(values)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatus('idle'))
                dispatch(setLogin(true))
            }
        })
        .catch(error => {
            dispatch(setError(error))
        })
}

export const setLogOutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    authApi.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatus('idle'))
                dispatch(setLogin(false))
                dispatch(logoutAppAC())
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