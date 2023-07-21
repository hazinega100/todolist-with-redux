import React, {useCallback} from "react";
import "./App.css";
import {Todolist} from "./components/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";
import {FilterType, TodolistType} from "./type/type";
import {AddItemForm} from "./components/AddItemForm";
import {addTodolistAC, changeFilterAC} from "./state/reducers/todolistReducer";
import axios from "axios";

interface userType {
    id: number
    userName: string
}

function App() {
    const dispatch = useDispatch()
    const todolistsState = useSelector<RootStateType, TodolistType[]>(state => state.todolists)

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [])
    const changeFilter = useCallback((todolistID: string, value: FilterType) => {
        dispatch(changeFilterAC(todolistID, value))
    }, [])
    return (
        <div className="App">
            <AddItemForm callback={addTodolist} />
            {
                todolistsState.map(tl => {

                    return <Todolist key={tl.id}
                                     todolistID={tl.id}
                                     title={tl.title}
                                     changeFilter={(value: FilterType) => changeFilter(tl.id, value)}
                                     filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
