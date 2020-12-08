enum AppConsts {
    SET_STATUS = 'APP/SET-STATUS',
    SET_ERROR = 'APP/SET-ERROR',
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    error: string | null
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

type ActionsType = ReturnType<typeof setAppStatus> |
    ReturnType<typeof setAppError>


export const setAppStatus = (status: RequestStatusType) => ({type: AppConsts.SET_STATUS, status} as const)
export const setAppError = (error: string | null) => ({type: AppConsts.SET_ERROR, error} as const)