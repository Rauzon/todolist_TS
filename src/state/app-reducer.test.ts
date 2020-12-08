import {appReducer, InitialStateType, setAppError, setAppStatus} from './app-reducer';

let startState: InitialStateType;
beforeEach(() => {
    startState = {
        status: 'idle',
        error: null
    }
});

test('should be set error to state', () => {
    const action = setAppError('some Error');

    const endState = appReducer(startState, action)

    const expectedState = {
        status: 'idle',
        error: 'some Error'
    }

    expect(endState).toEqual(expectedState);
});
test('correct task should be added to correct array', () => {
    const action = setAppStatus("loading");
    const action2 = setAppStatus("succeeded");

    const endState = appReducer(startState, action)
    const endState2 = appReducer(startState, action2)

    const expectedState = {
        status: 'loading',
        error: null
    }

    expect(endState).toEqual(expectedState);
    expect(endState2.status).toBe('succeeded');
});