import React, {useCallback} from 'react';
import {FilterType, TodolistDomainType} from "../type/type";
import {Todolist} from "./Todolist";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "./AddItemForm";
import Container from "@mui/material/Container";
import {addTodolistTC, changeFilterAC} from "../state/reducers/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../state/store";

export const Todolists = () => {
    const dispatch = useDispatch<AppDispatchType>()

    const todolistsState = useSelector<RootStateType, TodolistDomainType[]>(state => state.todolists)

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])
    const changeFilter = useCallback((todolistID: string, value: FilterType) => {
        dispatch(changeFilterAC(todolistID, value))
    }, [])
    return (
        <Container fixed>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm callback={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolistsState.map(tl => {
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist key={tl.id}
                                              todolistID={tl.id}
                                              title={tl.title}
                                              changeFilter={(value: FilterType) => changeFilter(tl.id, value)}
                                              filter={tl.filter}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Container>
    )
};