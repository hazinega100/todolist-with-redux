export type FilterType = "all" | "active" | "completed" | undefined

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
    filter?: FilterType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type AllTasksType = {
    [key: string]: TaskType[]
}