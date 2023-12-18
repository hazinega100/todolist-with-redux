import {Dispatch} from "redux";
import {todolistsApi} from "../../api/todolistsApi";
import {authApi} from "../../api/authApi";
import {setLogin, setUser} from "./auth-reducer";

const initState: InitStateType = {
    status: "idle",
    error: null,
    initialized: false
}

export const appReducer = (state = initState, action: ActionType): InitStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        case "APP/SET-INITIALIZED": {
            return {...state, initialized: action.value}
        }
        default: {
            return state
        }
    }
}

// actions
export const setStatus = (status: StatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}

export const setError = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}

export const setInitialized = (value: boolean) => {
    return {
        type: 'APP/SET-INITIALIZED',
        value
    } as const
}

// thank
export const setStatusTC = () => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setStatus('idle'))
        })
        .catch(error => {
            dispatch(setError(error))
        })
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    authApi.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setStatus('idle'))
                dispatch(setLogin(true))
                dispatch(setInitialized(true))
                dispatch(setUser(res.data.data.login))
            } else {
                dispatch(setError(res.data.messages[0]))
                dispatch(setStatus('failed'))
            }
            dispatch(setInitialized(true))
        })
        .catch(error => {
            dispatch(setError(error))
        })
}

// types
export type StatusType = 'idle' | 'loading' | 'succeed' | 'failed'
export type InitStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: StatusType
    // если ошибка какая-то глобальная произойдет, запишем ее сюда
    error: string | null
    // проверка пользователя (залогинен он или нет, настройки получили от сервера и т.д.)
    initialized: boolean
}

type ActionType = SetStatusType | SetErrorType | SetInitializedType
type SetStatusType = ReturnType<typeof setStatus>
type SetErrorType = ReturnType<typeof setError>
type SetInitializedType = ReturnType<typeof setInitialized>