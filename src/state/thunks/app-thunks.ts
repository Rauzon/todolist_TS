import {authAPI, LoginType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {ActionsAuthType, setIsLoggedIn} from "../auth-reducer";
import {ActionsAppType, setAppStatus, setIsInitialized} from "../app-reducer";
import {thunkErrorHandler, thunkServerErrorHandler} from "../thunksUtils/errorHandlers";

//check your authorization
export const initializeAppThunk = () => {

    return (dispatch: Dispatch<ActionsAuthType | ActionsAppType>) => {
        dispatch(setAppStatus("loading"))
        authAPI.auth()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedIn(true))
                    dispatch(setAppStatus("succeeded"))
                } else {
                    thunkErrorHandler(res.data, dispatch)
                }
                dispatch(setIsInitialized(true))
            })
            .catch((err) => {
                thunkServerErrorHandler(err, dispatch)
            })
    }
}





