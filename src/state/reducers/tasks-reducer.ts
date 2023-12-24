import {AllTasksType, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../../type/type";
import {AddTodolistACType, GetTodolistACType, RemoveTodolistACType, setEntityStatusAC} from "./todolist-reducer";
import {Dispatch} from "redux";
import {todolistsApi} from "../../api/todolistsApi";
import {RootStateType} from "../store";
import {setAppStatus} from "./app-reducer";
import {handlerServerAppError, handlerServerNetworkError} from "../../utils/error-utils";

// state
const initState: AllTasksType = {}

export const tasksReducer = (state = initState, action: ActionType): AllTasksType => {
    switch (action.type) {
        case "GET-TODOLIST": {
            const copyState = {...state}
            action.todolists.forEach(tl => copyState[tl.id] = [])
            return copyState
            // return {...state, ...action.todolists.reduce((obj, tl) => ({...obj, [tl.id]: []}), {})}
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todolistID]
            return copyState
        }
        case "GET-TASK": {
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }
        case "ADD-TASK": {
            const newTask = action.payload.task
            return {
                ...state,
                [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]
            }
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .filter(t => t.id !== action.payload.taskID)
            }
        }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .map(t => t.id === action.payload.taskID ? {...t, ...action.payload.modal} : t)
            }
        }
        default: {
            return state
        }
    }
}

// actions
export const getTaskAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: "GET-TASK",
        tasks,
        todolistId
    } as const
}
export const addTaskAC = (todolistID: string, task: TaskType) => {
    return {
        type: "ADD-TASK",
        payload: {
            todolistID,
            task
        }
    } as const
}
export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistID,
            taskID
        }
    } as const
}
export const updateTaskAC = (todolistID: string, taskID: string, modal: UpdateTaskModelType) => {
    return {
        type: "UPDATE-TASK",
        payload: {
            todolistID,
            taskID,
            modal
        }
    } as const
}

// thunks
export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    dispatch(setEntityStatusAC('loading', todolistID))
    todolistsApi.createTask(todolistID, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTaskAC(todolistID, response.data.data.item))
                dispatch(setAppStatus('succeed'))
                dispatch(setEntityStatusAC('succeed', todolistID))
            } else {
                handlerServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handlerServerNetworkError(error.message, dispatch, todolistID)
        })
}
export const getTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    todolistsApi.getTasks(todolistID)
        .then(response => {
            dispatch(getTaskAC(todolistID, response.data.items))
        })
}
export const updateTaskTC = (todolistID: string, taskID: string, update: UpdateDomainModelType) => {
    // getState - получаем весь state из Store
    return (dispatch: Dispatch, getState: GetStoreStateType) => {

        const task = getState().tasks[todolistID].find(t => t.id === taskID)

        if (task) {
            const model: UpdateTaskModelType = {
                title: task.title,
                status: task.status,
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                ...update
            }
            todolistsApi.updateTask(todolistID, taskID, model)
                .then(response => {
                    if (response.data.resultCode === 0) {
                        dispatch(updateTaskAC(todolistID, taskID, model))
                    } else {
                        handlerServerAppError(response.data, dispatch)
                    }
                })
                .catch(error => {
                    handlerServerNetworkError(error.message, dispatch)
                })
        }
    }
}
export const deleteTaskTC = (todolistID: string, taskID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    dispatch(setEntityStatusAC('loading', todolistID))
    todolistsApi.deleteTask(todolistID, taskID)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistID, taskID))
                dispatch(setAppStatus('succeed'))
                dispatch(setEntityStatusAC('succeed', todolistID))
            } else {
                handlerServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handlerServerNetworkError(error.message, dispatch, todolistID)
        })
}

// types
type AddTaskACType = ReturnType<typeof addTaskAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type ChangeTaskStatusType = ReturnType<typeof updateTaskAC>
type GetTaskACType = ReturnType<typeof getTaskAC>

type ActionType =
    | AddTaskACType
    | AddTodolistACType
    | RemoveTaskACType
    | ChangeTaskStatusType
    | RemoveTodolistACType
    | GetTodolistACType
    | GetTaskACType

type GetStoreStateType = () => RootStateType

type UpdateDomainModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}