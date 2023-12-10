import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistReducer} from "./reducers/todolist-reducer";
import {tasksReducer} from "./reducers/tasks-reducer";
import {appReducer} from "./reducers/app-reducer";
import thunk from "redux-thunk";
import {ThunkDispatch} from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {authReducer} from "./reducers/auth-reducer";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export type AppDispatchType = ThunkDispatch<RootStateType, any, AnyAction>

export const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store