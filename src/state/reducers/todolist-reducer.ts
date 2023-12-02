import {FilterType, ResponseTimeType, TodolistDomainType} from "../../type/type";
import {Dispatch} from "redux";
import {todolistsApi} from "../../api/todolistsApi";
import {setError, setStatus} from "./app-reducer";

// state
const initState: TodolistDomainType[] = []

export const todolistReducer = (state = initState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "GET-TODOLIST": {
            return [...state, ...action.todolists]
        }
        case "ADD-TODOLIST": {
            return [
                {...action.todolist, filter: "all"},
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
        default: {
            return state
        }
    }
}

// action
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

// thunk
export const getTodosTC = () => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    todolistsApi.getTodolists()
        .then(response => {
            dispatch(getTodolistAC(response.data))
            dispatch(setStatus('idle'))
        })
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatus('loading'))
        todolistsApi.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setStatus('idle'))
            })
    }
}

export const changeTitleTodolistTC = (todolistID: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatus('loading'))
        todolistsApi.updateTodolist(todolistID, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTitleTodolistAC(todolistID, title))
                    dispatch(setStatus('idle'))
                } else {
                    dispatch(setError(res.data.messages[0]))
                }
            })
    }
}

export const removeTodolistTC = (todolistID: string, setDisabled: ResponseTimeType) => {
    setDisabled(true)
    return (dispatch: Dispatch) =>
        todolistsApi.deleteTodolist(todolistID)
            .then(res => {
                setDisabled(false)
                dispatch(removeTodolistAC(todolistID))
            })
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