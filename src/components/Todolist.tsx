import React, {ChangeEvent} from 'react';
import {AllTasksType} from "../type/type";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../store";
import {addTaskAC, changeStatusTaskAC, removeTaskAC} from "../reducers/tasksReducer";
import {AddItemForm} from "./AddItemForm";
import {removeTodolistAC} from "../reducers/todolistReducer";

type TodolistPropsType = {
    todolistID: string
    title: string
    // tasks: AllTasksType
}

export const Todolist: React.FC<TodolistPropsType> = (
    {
        todolistID,
        title,
        // tasks,
    }
) => {
    const tasksState = useSelector<RootStateType, AllTasksType>(state => state.tasks)
    const dispatch = useDispatch()
    const addTask = (title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }
    const removeTodolist = () => {
        dispatch(removeTodolistAC(todolistID))
    }
    return (
        <div>
            <h3>
                {title}
                <button onClick={removeTodolist}>X</button>
            </h3>
            <div>
                <AddItemForm callback={addTask} />
            </div>
            <ul>
                {/*<li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>*/}
                {/*<li><input type="checkbox" checked={true}/> <span>JS</span></li>*/}
                {/*<li><input type="checkbox" checked={false}/> <span>React</span></li>*/}
                {
                    tasksState[todolistID].map(task => {
                        const onclickRemoveTask = () => {
                            dispatch(removeTaskAC(todolistID, task.id))
                        }
                        const changeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
                            const newTaskStatus = e.currentTarget.checked
                            dispatch(changeStatusTaskAC(todolistID, task.id, newTaskStatus))
                        }
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} onChange={changeStatusTask} />
                                <span>{task.title}</span>
                                <button onClick={onclickRemoveTask}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};