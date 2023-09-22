import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {AllTasksType, FilterType, TaskStatuses} from "../type/type";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../state/store";
import {
    addTaskTC,
    updateTaskTC,
    deleteTaskTC,
    getTasksTC
} from "../state/reducers/tasks-reducer";
import {AddItemForm} from "./AddItemForm";
import {removeTodolistTC} from "../state/reducers/todolist-reducer";

type TodolistPropsType = {
    todolistID: string
    title: string
    changeFilter: (value: FilterType) => void
    filter: FilterType
}

export const Todolist: React.FC<TodolistPropsType> = React.memo((
    {
        todolistID,
        title,
        changeFilter,
        filter
    }
) => {
    console.log("Todolist rendered")
    const tasksState = useSelector<RootStateType, AllTasksType>(state => state.tasks)
    const [disabledTl, setDisabledTl] = useState(false)
    const [disabledTask, setDisabledTask] = useState(false)
    const dispatch = useDispatch<AppDispatchType>()
    useEffect(() => {
        dispatch(getTasksTC(todolistID))
    }, [])

    // addTask
    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(todolistID, title))
    }, [])

    // removeTodolist
    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistTC(todolistID, setDisabledTl))
    }, [])

    const allTasks = tasksState[todolistID]
    let tasksForTodolist = allTasks
    if (filter === "active") {
        tasksForTodolist = allTasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === "completed") {
        tasksForTodolist = allTasks.filter(t => t.status === TaskStatuses.Completed)
    }

    // removeTask
    const onClickRemoveTask = useCallback((taskID: string) => {
        dispatch(deleteTaskTC(todolistID, taskID, setDisabledTask))
    }, [])

    // changeStatusTask
    const changeStatusTask = useCallback((e: ChangeEvent<HTMLInputElement>, taskID: string) => {
        let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC(todolistID, taskID, {status}))
    }, [])

    // changeTodolistFilter
    const changeTodolistFilterAll = useCallback(() => changeFilter("all"), [])
    const changeTodolistFilterActive = useCallback(() => changeFilter("active"), [])
    const changeTodolistFilterCompleted = useCallback(() => changeFilter("completed"), [])

    return (
        <div>
            <h3>
                {title}
                <button onClick={removeTodolist}
                        disabled={disabledTl}>X
                </button>
            </h3>
            <div>
                <AddItemForm callback={addTask}/>
            </div>
            <ul>
                {
                    tasksForTodolist.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox"
                                       checked={task.status === TaskStatuses.Completed}
                                       onChange={(e) => changeStatusTask(e, task.id)}
                                />
                                <span>{task.title}</span>
                                <button onClick={() => onClickRemoveTask(task.id)}
                                        disabled={disabledTask}>X
                                </button>
                                <div>{task.addedDate}</div>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={changeTodolistFilterAll}>All</button>
                <button onClick={changeTodolistFilterActive}>Active</button>
                <button onClick={changeTodolistFilterCompleted}>Completed</button>
            </div>
        </div>
    );
})