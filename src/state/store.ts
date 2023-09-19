import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistReducer} from "./reducers/todolist-reducer";
import {tasksReducer} from "./reducers/tasks-reducer";
import thunk from "redux-thunk";
import {ThunkDispatch} from "redux-thunk";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export type AppDispatchType = ThunkDispatch<RootStateType, any, AnyAction>

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store