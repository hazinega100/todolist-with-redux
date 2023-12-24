import {FilterType, TodolistDomainType} from "../../type/type";
import {Dispatch} from "redux";
import {todolistsApi} from "../../api/todolistsApi";
import {setAppStatus, StatusType} from "./app-reducer";
import {handlerServerAppError, handlerServerNetworkError} from "../../utils/error-utils";

// state
const initState: TodolistDomainType[] = []

export const todolistReducer = (state = initState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "GET-TODOLIST": {
            return [...state, ...action.todolists]
        }
        case "ADD-TODOLIST": {
            return [
                {...action.todolist, filter: "all", entityStatus: "idle"},
                ...state
            ]
        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.todolistID)
        }
        case "FILTERED-TASKS": {
            return state.map(tl => tl.id === action.payload.todolistID ? {...tl, filter: action.payload.value} : tl)
        }
        case "CHANGE-TITLE-TL": {
            return state.map(tl => tl.id === action.payload.todolistID ? {...tl, title: action.payload.title} : tl)
        }
        case "CHANGE-ENTITY-STATUS": {
            return state.map(tl => tl.id === action.payload.todolistID ? {...tl, entityStatus: action.payload.status} : tl)
        }
        default: {
            return state
        }
    }
}

// actions
const getTodolistAC = (todolists: TodolistDomainType[]) => {
    return {
        type: "GET-TODOLIST",
        todolists
    } as const
}

const addTodolistAC = (todolist: TodolistDomainType) => {
    return {
        type: "ADD-TODOLIST",
        todolist
    } as const
}

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: "REMOVE-TODOLIST",
        todolistID
    } as const
}

export const changeFilterAC = (todolistID: string, value: FilterType) => {
    return {
        type: "FILTERED-TASKS",
        payload: {
            todolistID,
            value
        }
    } as const
}

export const changeTitleTodolistAC = (todolistID: string, title: string) => {
    return {
        type: "CHANGE-TITLE-TL",
        payload: {
            todolistID,
            title
        }
    } as const
}

export const setEntityStatusAC = (status: StatusType, todolistID: string) => {
    return {
        type: "CHANGE-ENTITY-STATUS",
        payload: {
            todolistID,
            status
        }
    } as const
}

// thunks
export const getTodosTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(getTodolistAC(res.data))
            dispatch(setAppStatus('idle'))
        })
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus('loading'))
        todolistsApi.createTodolist(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setAppStatus('idle'))
                } else {
                    handlerServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handlerServerNetworkError(error.message, dispatch)
            })
    }
}

export const changeTitleTodolistTC = (todolistID: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus('loading'))
        todolistsApi.updateTodolist(todolistID, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTitleTodolistAC(todolistID, title))
                    dispatch(setAppStatus('idle'))
                } else {
                    handlerServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handlerServerNetworkError(error.message, dispatch)
            })
    }
}

export const removeTodolistTC = (todolistID: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus('loading'))
        dispatch(setEntityStatusAC('loading', todolistID))
        todolistsApi.deleteTodolist(todolistID)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC(todolistID))
                    dispatch(setAppStatus('succeed'))
                } else {
                    handlerServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handlerServerNetworkError(error.message, dispatch, todolistID)
            })
    }
}

// types
export type GetTodolistACType = ReturnType<typeof getTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
type ChangeTodolistFilterType = ReturnType<typeof changeFilterAC>
type ChangeTitleTodolistType = ReturnType<typeof changeTitleTodolistAC>

type ActionType =
    | AddTodolistACType
    | RemoveTodolistACType
    | ChangeTodolistFilterType
    | GetTodolistACType
    | ChangeTitleTodolistType
    | ReturnType<typeof setEntityStatusAC>