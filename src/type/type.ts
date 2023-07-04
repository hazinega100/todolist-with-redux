export type FilterType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type AllTasksType = {
    [key: string]: TaskType[]
}