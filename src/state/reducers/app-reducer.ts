import {Dispatch} from "redux";
import {todolistsApi} from "../../api/todolistsApi";

const initState: InitStateType = {
    status: "idle",
    error: null
}

export const appReducer = (state = initState, action: ActionType): InitStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
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

// types
export type StatusType = 'idle' | 'loading' | 'succeed' | 'failed'
export type InitStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: StatusType
    // если ошибка какая-то глобальная произойдет, запишем ее сюда
    error: string | null
}

type ActionType = SetStatusType | SetErrorType
type SetStatusType = ReturnType<typeof setStatus>
type SetErrorType = ReturnType<typeof setError>