import React, {ChangeEvent, useCallback, useEffect} from "react";
import {AllTasksType, FilterType, TaskStatuses} from "../type/type";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../state/store";
import {addTaskTC, deleteTaskTC, getTasksTC, updateTaskTC} from "../state/reducers/tasks-reducer";
import {AddItemForm} from "./AddItemForm";
import {changeTitleTodolistTC, removeTodolistTC} from "../state/reducers/todolist-reducer";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {DeleteButton} from "./Buttons/DeleteButton";
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from "./EditableSpan";
import {StatusType} from "../state/reducers/app-reducer";

type TodolistPropsType = {
    todolistID: string
    title: string
    changeFilter: (value: FilterType) => void
    filter: FilterType
    entityStatus: StatusType
}

export const Todolist: React.FC<TodolistPropsType> = React.memo((
    {
        todolistID,
        title,
        changeFilter,
        filter,
        entityStatus
    }
) => {
    console.log("Todolist rendered")
    const tasksState = useSelector<RootStateType, AllTasksType>(state => state.tasks)
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
        dispatch(removeTodolistTC(todolistID))
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
        dispatch(deleteTaskTC(todolistID, taskID))
    }, [])

    // changeStatusTask
    const changeStatusTask = useCallback((e: ChangeEvent<HTMLInputElement>, taskID: string) => {
        let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC(todolistID, taskID, {status}))
    }, [])

    // changeTitleTask
    const changeTitleTask = (taskId: string, title: string) => {
        dispatch(updateTaskTC(todolistID, taskId, {title}))
    }

    // changeTitleTodolist
    const changeTitleTodolist = (newTittle: string) => {
        dispatch(changeTitleTodolistTC(todolistID, newTittle))
    }

    // changeTodolistFilter
    const changeTodolistFilterAll = useCallback(() => changeFilter("all"), [])
    const changeTodolistFilterActive = useCallback(() => changeFilter("active"), [])
    const changeTodolistFilterCompleted = useCallback(() => changeFilter("completed"), [])

    return (
        <div className="todolist_wrapper">
            <h3>
                <EditableSpan title={title} callBack={changeTitleTodolist} />
                <DeleteButton disabled={entityStatus === 'loading'} remove={removeTodolist}/>
            </h3>
            <div>
                <AddItemForm callback={addTask} disabled={entityStatus === 'loading'}/>
            </div>
            <ul>
                {
                    tasksForTodolist.map(task => {
                        return (
                            <li key={task.id}>
                                <Checkbox size="small"
                                          checked={task.status === TaskStatuses.Completed}
                                          onChange={(e) => changeStatusTask(e, task.id)}
                                />
                                <EditableSpan title={task.title} callBack={(newTitle) => changeTitleTask(task.id, newTitle)} />
                                <DeleteButton remove={() => onClickRemoveTask(task.id)} disabled={entityStatus === 'loading'}/>
                                {/*<div>{task.addedDate}</div>*/}
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <Stack direction="row" spacing={1}>
                    <Button size={"small"} color="secondary"
                            variant={filter === 'all' ? "contained" : 'outlined'}
                            onClick={changeTodolistFilterAll}>All</Button>
                    <Button size={"small"} color="warning"
                            variant={filter === 'active' ? "contained" : 'outlined'}
                            onClick={changeTodolistFilterActive}>Active</Button>
                    <Button size={"small"} color="success"
                            variant={filter === 'completed' ? "contained" : 'outlined'}
                            onClick={changeTodolistFilterCompleted}>Completed</Button>
                </Stack>
            </div>
        </div>
    );
})