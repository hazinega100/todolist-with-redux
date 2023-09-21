import {AllTasksType, TaskStatuses, TaskType, UpdateTaskModelType} from "../../type/type";
import {GetTodolistACType, newTodolistID} from "./todolist-reducer";
import {Dispatch} from "redux";
import {todolistsApi} from "../../api/todolistsApi";
import {RootStateType} from "../store";

const initState: AllTasksType = {}

type AddTaskACType = ReturnType<typeof addTaskAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type ChangeTaskStatusType = ReturnType<typeof changeStatusTaskAC>
type GetTaskACType = ReturnType<typeof getTaskAC>
type AddTodolistType = {
    type: "ADD-TODOLIST"
}
type RemoveTodolistType = {
    type: "REMOVE-TODOLIST"
    todolistID: string
}

type ActionType = AddTaskACType
    | RemoveTaskACType
    | AddTodolistType
    | ChangeTaskStatusType
    | RemoveTodolistType
    | GetTodolistACType
    | GetTaskACType

export const tasksReducer = (state = initState, action: ActionType): AllTasksType => {
    switch (action.type) {
        case "GET-TODOLIST": {
            // const copyState = {...state}
            // action.todolists.forEach(tl => copyState[tl.id] = [])
            // return copyState
            return {...state, ...action.todolists.reduce((obj, tl) => ({...obj, [tl.id]: []}), {})}
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [newTodolistID]: []
            }
        }
        case "REMOVE-TODOLIST": {
            // Нужно доделать
            return state
        }
        case "GET-TASK": {
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.todolistID]: [action.payload.task, ...state[action.payload.todolistID]]
            }
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .filter(t => t.id !== action.payload.taskID)
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .map(t => t.id === action.payload.taskID ? {...t, status: action.payload.status} : t)
            }
        }
        default: {
            return state
        }
    }
}

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

export const changeStatusTaskAC = (todolistID: string, taskID: string, status: TaskStatuses) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            todolistID,
            taskID,
            status
        }
    } as const
}


export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    todolistsApi.createTask(todolistID, title)
        .then(response => {
            dispatch(addTaskAC(todolistID, response.data.data.item))
        })
}

export const getTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    todolistsApi.getTasks(todolistID)
        .then(response => {
            dispatch(getTaskAC(todolistID, response.data.items))
        })
}

type GetStoreStateType = () => RootStateType

export const changeTaskStatusTC = (todolistID: string, taskID: string, status: TaskStatuses) => {
    // getState - получаем весь state из Store
    return (dispatch: Dispatch, getState: GetStoreStateType) => {

        const task = getState().tasks[todolistID].find(t => t.id === taskID)

        if (task) {
            const model: UpdateTaskModelType = {
                title: task.title,
                status,
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate
            }
            todolistsApi.updateTask(todolistID, taskID, model)
                .then(response => {
                    dispatch(changeStatusTaskAC(todolistID, taskID, response.data.data.item.status))
                })
                .catch(error => {
                    throw Error("Not internet", error)
                })
        }
    }
}

export const deleteTaskTC = (todolistID: string, taskID: string) => (dispatch: Dispatch) => {
    todolistsApi.deleteTask(todolistID, taskID)
        .then(response => {
            dispatch(removeTaskAC(todolistID, taskID))
        })
}