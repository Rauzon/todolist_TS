enum AuthConsts {
    IS_LOGGED_IN = 'AUTH/IS_LOGGED_IN',
}


export type InitialAuthStateType = {
    isLoggedIn: boolean
}

const initialState: InitialAuthStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialAuthStateType = initialState, action: ActionsAuthType): InitialAuthStateType => {
    switch (action.type) {
        case AuthConsts.IS_LOGGED_IN:
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

export type ActionsAuthType = ReturnType<typeof setIsLoggedIn>


export const setIsLoggedIn = (isLoggedIn: boolean) => ({type: AuthConsts.IS_LOGGED_IN, isLoggedIn} as const)