import {combineReducers, legacy_createStore} from "redux";
import {todolistReducer} from "./reducers/todolistReducer";
import {tasksReducer} from "./reducers/tasksReducer";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer)

export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store