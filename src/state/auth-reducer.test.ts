import {authReducer, InitialAuthStateType, setIsLoggedIn} from "./auth-reducer";


let startState: InitialAuthStateType;
beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
});

test('should be set isLoggedIn\'s value in true', () => {
    const action = setIsLoggedIn({isLoggedIn: true});

    const endState = authReducer(startState, action)

    const expectedState = {
        isLoggedIn: true
    }
    expect(endState).toEqual(expectedState);
});