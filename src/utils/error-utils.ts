import {Dispatch} from "redux";
import {setAppStatus, setError} from "../state/reducers/app-reducer";
import {ResponseType} from "../api/todolistsApi";
import {setEntityStatusAC} from "../state/reducers/todolist-reducer";

export const handlerServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setError(data.messages[0]))
    } else {
        dispatch(setError('some error occurred'))
    }
    dispatch(setAppStatus('failed'))
}

export const handlerServerNetworkError = (error: string, dispatch: Dispatch, id?: string) => {
    dispatch(setAppStatus('failed'))
    dispatch(setError(error ? error : "Some error occurred"))
    if (id) {
        dispatch(setEntityStatusAC('failed', id))
        dispatch(setAppStatus('failed'))
        dispatch(setError(error))
    }
}