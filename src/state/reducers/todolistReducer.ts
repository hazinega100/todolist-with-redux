import {FilterType, TodolistType} from "../../type/type";
import {v1} from "uuid";

export const todolistID_1 = v1()
export const todolistID_2 = v1()
export let newTodolistID: string
// STATE
const initState: TodolistType[] = [
    {id: todolistID_1, title: "What to learn", filter: "all"},
    {id: todolistID_2, title: "What to bye", filter: "all"},
]

type AddTodolistACType = ReturnType<typeof addTodolistAC>
type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
type ChangeTodolistFilterType = ReturnType<typeof changeFilterAC>

type ActionType = AddTodolistACType
    | RemoveTodolistACType
    | ChangeTodolistFilterType

export const todolistReducer = (state = initState, action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            newTodolistID = v1()
            const newTL: TodolistType = {id: newTodolistID, title: action.payload, filter: "all"}
            return [newTL, ...state]
        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload)
        }
        case "FILTERED-TASKS": {
            return state.map(tl => tl.id === action.payload.todolistID ? {...tl, filter: action.payload.value} : tl)
        }
        default: {
            return state
        }
    }
}

export const addTodolistAC = (value: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: value
    } as const
}

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: todolistID
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