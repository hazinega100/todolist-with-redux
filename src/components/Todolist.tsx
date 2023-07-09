import React, {ChangeEvent, useCallback} from "react";
import {AllTasksType, FilterType} from "../type/type";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../state/store";
import {addTaskAC, changeStatusTaskAC, removeTaskAC} from "../state/reducers/tasksReducer";
import {AddItemForm} from "./AddItemForm";
import {removeTodolistAC} from "../state/reducers/todolistReducer";

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
    const dispatch = useDispatch()
    // addTask
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }, [])
    // removeTodolist
    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(todolistID))
    }, [])
    const allTasks = tasksState[todolistID]
    let tasksForTodolist = allTasks
    if (filter === "active") {
        tasksForTodolist = allTasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForTodolist = allTasks.filter(t => t.isDone)
    }
    // removeTask
    const onClickRemoveTask = useCallback((taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID))
    }, [])
    // changeStatusTask
    const changeStatusTask = useCallback((e: ChangeEvent<HTMLInputElement>, taskID: string) => {
        const newTaskStatus = e.currentTarget.checked
        dispatch(changeStatusTaskAC(todolistID, taskID, newTaskStatus))
    }, [])
    // changeTodolistFilter
    const changeTodolistFilterAll = useCallback(() => changeFilter("all"), [])
    const changeTodolistFilterActive = useCallback(() => changeFilter("active"), [])
    const changeTodolistFilterCompleted = useCallback(() => changeFilter("completed"), [])

    return (
        <div>
            <h3>
                {title}
                <button onClick={removeTodolist}>X</button>
            </h3>
            <div>
                <AddItemForm callback={addTask}/>
            </div>
            <ul>
                {
                    tasksForTodolist.map(task => {


                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} onChange={ (e) => changeStatusTask(e, task.id) }/>
                                <span>{task.title}</span>
                                <button onClick={ () => onClickRemoveTask(task.id) }>X</button>
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