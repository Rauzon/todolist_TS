enum AppConsts {
    SET_STATUS = 'APP/SET_STATUS',
    SET_ERROR = 'APP/SET_ERROR',
    SET_IS_INITIALIZED = 'APP/IS_INITIALIZED',
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsAppType): InitialStateType => {
    switch (action.type) {
        case AppConsts.SET_STATUS:
            return {...state, status: action.status}
        case AppConsts.SET_ERROR:
            return {...state, error: action.error}
        case AppConsts.SET_IS_INITIALIZED:
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

export type ActionsAppType = ReturnType<typeof setAppStatus> |
    ReturnType<typeof setAppError> |
    ReturnType<typeof setIsInitialized>


export const setAppStatus = (status: RequestStatusType) => ({type: AppConsts.SET_STATUS, status} as const)
export const setAppError = (error: string | null) => ({type: AppConsts.SET_ERROR, error} as const)
export const setIsInitialized = (value: boolean) => ({type: AppConsts.SET_IS_INITIALIZED, value} as const)