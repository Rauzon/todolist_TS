import {appReducer, InitialStateType, setAppError, setAppStatus, setIsInitialized} from './app-reducer';

let startState: InitialStateType;
beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
});

test('should be set error to state', () => {
    const action = setAppError({error: 'some Error'});

    const endState = appReducer(startState, action)

    const expectedState = {
        status: 'idle',
        error: 'some Error',
        isInitialized: false
    }

    expect(endState).toEqual(expectedState);
});
test('correct task should be added to correct array', () => {
    const action = setAppStatus({status: "loading"});
    const action2 = setAppStatus({status: "succeeded"});

    const endState = appReducer(startState, action)
    const endState2 = appReducer(startState, action2)

    const expectedState = {
        status: 'loading',
        error: null,
        isInitialized: false
    }

    expect(endState).toEqual(expectedState);
    expect(endState2.status).toBe('succeeded');
});
test('should set isInitialized value to true', () => {
    const action = setIsInitialized({value: true});

    const endState = appReducer(startState, action)

    const expectedState = {
        status: 'idle',
        error: null,
        isInitialized: true
    }

    expect(endState).toEqual(expectedState);
});