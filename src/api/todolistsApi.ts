import axios from "axios";
import {TaskType, TodolistType, UpdateTaskModelType} from "../type/type";

const settings = {
    withCredentials: true,
    "API-KEY": "9d6d2507-dd03-42c3-a678-bf198d9db789"
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const todolistsApi = {
    createTodolist(title: string) {
        return instance.post('todo-lists', {title: title})
    },
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    updateTodolist(id: string, title: string) {
        return instance.put(`todo-lists/${id}`, {title: title})
    },
    deleteTodolist(id: string) {
        return instance.delete(`todo-lists/${id}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    data: T
}
