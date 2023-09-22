export type FilterType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TodolistDomainType = TodolistType & {
    filter: FilterType
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type AllTasksType = {
    [key: string]: TaskType[]
}

export type ResponseTimeType = (res: boolean) => void

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}