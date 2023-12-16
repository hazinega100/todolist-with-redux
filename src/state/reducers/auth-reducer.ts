import {Dispatch} from "redux";
import {setError, setStatus} from "./app-reducer";
import {authApi} from "../../api/authApi";

const initState: InitStateType = {
    isLoggedIn: false
}

export const authReducer = (state = initState, action: ActionType): InitStateType => {
    switch (action.type) {
        case 'AUTH/LOGIN': {
            return {...state, isLoggedIn: action.login}
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
export const setMe = (login: boolean) => {
    return {
        type: 'AUTH/ME',
        login
    } as const
}

// thank
export const setIsLoggedInTC = (email: string, password: string) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    authApi.logIn(email, password)
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

// export const setIsMeTC = () => (dispatch: Dispatch) => {
//     dispatch(setStatus('loading'))
//     authApi.me()
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setStatus('idle'))
//                 dispatch(setMe(true))
//             }
//         })
//         .catch(error => {
//             dispatch(setError(error))
//         })
// }

// types
export type InitStateType = {
    isLoggedIn: boolean
}
export type LoginType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean
}

type ActionType = SetLoginType | SetIsMeType
type SetLoginType = ReturnType<typeof setLogin>
type SetIsMeType = ReturnType<typeof setMe>