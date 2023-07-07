import {AllTasksType, TaskType} from "../../type/type";
import {v1} from "uuid";
import {newTodolistID, todolistID_1, todolistID_2} from "./todolistReducer";

const initState: AllTasksType = {
    [todolistID_1]: [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
    ],
    [todolistID_2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Meat", isDone: false},
        {id: v1(), title: "Tea", isDone: false},
    ]
}

type AddTaskACType = ReturnType<typeof addTaskAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTodolistType = {
    type: "ADD-TODOLIST"
}
type RemoveTodolistType = {
    type: "REMOVE-TODOLIST"
    todolistID: string
}
type ChangeTaskStatusType = ReturnType<typeof changeStatusTaskAC>

type ActionType = AddTaskACType
    | RemoveTaskACType
    | AddTodolistType
    | ChangeTaskStatusType
    | RemoveTodolistType

export const tasksReducer = (state = initState, action: ActionType): AllTasksType => {
    switch (action.type) {
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
        case "ADD-TASK": {
            const newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {...state,
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
        case "CHANGE-TASK-STATUS": {
            return {...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .map(t => t.id === action.payload.taskID ? {...t, isDone: action.payload.newTaskStatus} : t)
            }
        }
        default: {
            return state
        }
    }
}

export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todolistID,
            title
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

export const changeStatusTaskAC = (todolistID: string, taskID: string, newTaskStatus: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            todolistID,
            taskID,
            newTaskStatus
        }
    } as const
}