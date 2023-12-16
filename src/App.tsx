import React, {useEffect} from "react";
import "./App.css";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "./state/store";
import {getTodosTC} from "./state/reducers/todolist-reducer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "./components/ErrorSnackbar";
import {setStatusTC, StatusType} from "./state/reducers/app-reducer";
import {NavLink, Route, Routes} from "react-router-dom";
import {Login} from "./components/Login/Login";
import {Todolists} from "./components/Todolists";

function App() {
    const dispatch = useDispatch<AppDispatchType>()
    const status = useSelector<RootStateType, StatusType>(state => state.app.status)
    const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        dispatch(getTodosTC())
        dispatch(setStatusTC())
    }, [isLoggedIn])
    // useEffect(() => {
    //     dispatch(setIsMeTC())
    // })
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

                    <NavLink style={{color: "white"}} to={'/login'}><Button color="inherit">Login</Button></NavLink>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress />}
            <Routes>
                <Route path='/' element={<Todolists />} />
                <Route path='/login' element={<Login />} />
            </Routes>
            <ErrorSnackbar />
        </div>
    );
}

export default App;
