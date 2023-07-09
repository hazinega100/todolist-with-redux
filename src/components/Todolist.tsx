import React, {ChangeEvent, useCallback} from 'react';
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

export const Todolist: React.FC<TodolistPropsType> = (
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
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }, [])
    const removeTodolist = () => {
        dispatch(removeTodolistAC(todolistID))
    }
    const changeTodolistFilter = (value: FilterType) => {
        changeFilter(value)
    }
    const allTasks = tasksState[todolistID]
    let tasksForTodolist = allTasks
    if (filter === "active") {
        tasksForTodolist = allTasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForTodolist = allTasks.filter(t => t.isDone)
    }
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
                        const onclickRemoveTask = () => {
                            dispatch(removeTaskAC(todolistID, task.id))
                        }
                        const changeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
                            const newTaskStatus = e.currentTarget.checked
                            dispatch(changeStatusTaskAC(todolistID, task.id, newTaskStatus))
                        }
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} onChange={changeStatusTask}/>
                                <span>{task.title}</span>
                                <button onClick={onclickRemoveTask}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={() => changeTodolistFilter("all")}>All</button>
                <button onClick={() => changeTodolistFilter("active")}>Active</button>
                <button onClick={() => changeTodolistFilter("completed")}>Completed</button>
            </div>
        </div>
    );
};