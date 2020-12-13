import {Dispatch} from "redux";
import {authAPI, LoginType} from "../../api/todolists-api";
import {ActionsAuthType, setIsLoggedIn} from "../auth-reducer";
import {ActionsAppType, setAppError, setAppStatus, setIsInitialized} from "../app-reducer";
import {thunkErrorHandler, thunkServerErrorHandler} from "../thunksUtils/errorHandlers";


export const loginThunk = (data: LoginType) => {

    return (dispatch: Dispatch<ActionsAuthType | ActionsAppType>) => {
        dispatch(setAppStatus("loading"))
        authAPI.login(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedIn(true))
                    dispatch(setAppStatus("succeeded"))
                } else {
                    thunkErrorHandler(res.data, dispatch)
                }
            })
            .catch((err) => {
                thunkServerErrorHandler(err, dispatch)
            })
    }
}
export const logOutThunk = () => {

    return (dispatch: Dispatch<ActionsAuthType | ActionsAppType>) => {
        dispatch(setAppStatus("loading"))
        authAPI.logOut()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedIn(false))
                    dispatch(setAppStatus("succeeded"))
                } else {
                    thunkErrorHandler(res.data, dispatch)
                }
            })
            .catch((err) => {
                thunkServerErrorHandler(err, dispatch)
            })
    }
}