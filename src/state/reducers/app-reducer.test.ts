import {appReducer, InitStateType, setError} from "./app-reducer";

let startState: InitStateType

beforeEach(() => {
    startState = {
        status: "idle",
        error: null
    }
})

test('error message should be set', () => {
    const endState = appReducer(startState, setError('some error'))

    expect(endState.error).toBe('some error')
    expect(endState.status).toBe('idle')
})