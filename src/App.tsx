import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./store";
import {AllTasksType, TodolistType} from "./type/type";
import {AddItemForm} from "./components/AddItemForm";
import {addTodolistAC} from "./reducers/todolistReducer";

function App() {
    const dispatch = useDispatch()
    const todolistsState = useSelector<RootStateType, TodolistType[]>(state => state.todolists)

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }
    return (
        <div className="App">
            <AddItemForm callback={addTodolist} />
            {
                todolistsState.map(tl => {
                    return <Todolist key={tl.id}
                                     todolistID={tl.id}
                                     title={tl.title}
                    />
                })
            }
        </div>
    );
}

export default App;
