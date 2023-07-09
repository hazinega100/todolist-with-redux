import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";
import {FilterType, TodolistType} from "./type/type";
import {AddItemForm} from "./components/AddItemForm";
import {addTodolistAC, changeFilterAC} from "./state/reducers/todolistReducer";

function App() {
    console.log("App rendered")
    const dispatch = useDispatch()
    const todolistsState = useSelector<RootStateType, TodolistType[]>(state => state.todolists)

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    },[])
    return (
        <div className="App">
            <AddItemForm callback={addTodolist} />
            {
                todolistsState.map(tl => {
                    const changeFilter = (value: FilterType) => {
                        dispatch(changeFilterAC(tl.id, value))
                    }
                    return <Todolist key={tl.id}
                                     todolistID={tl.id}
                                     title={tl.title}
                                     changeFilter={changeFilter}
                                     filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
