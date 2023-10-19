import React, {useCallback, useEffect} from "react";
import "./App.css";
import {Todolist} from "./components/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "./state/store";
import {FilterType, TodolistDomainType} from "./type/type";
import {AddItemForm} from "./components/AddItemForm";
import {addTodolistTC, changeFilterAC, getTodosTC} from "./state/reducers/todolist-reducer";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "./components/ErrorSnackbar";
import {setStatusTC, StatusType} from "./state/reducers/app-reducer";

function App() {

    const dispatch = useDispatch<AppDispatchType>()
    const todolistsState = useSelector<RootStateType, TodolistDomainType[]>(state => state.todolists)
    const status = useSelector<RootStateType, StatusType>(state => state.app.status)

    useEffect(() => {
        dispatch(getTodosTC())
        dispatch(setStatusTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])
    const changeFilter = useCallback((todolistID: string, value: FilterType) => {
        dispatch(changeFilterAC(todolistID, value))
    }, [])
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar className="app_bar">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' ? <LinearProgress /> : ''}
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
                <ErrorSnackbar />
            </Container>
        </div>
    );
}

export default App;
