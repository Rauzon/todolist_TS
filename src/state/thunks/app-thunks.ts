import {authAPI} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {setIsLoggedIn} from "../auth-reducer";
import {setAppStatus, setIsInitialized} from "../app-reducer";
import {thunkErrorHandler, thunkServerErrorHandler} from "../thunksUtils/errorHandlers";

//check your authorization
export const initializeAppThunk = () => {

    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        authAPI.auth()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedIn({isLoggedIn: true}))
                    dispatch(setAppStatus({status: 'succeeded'}))
                } else {
                    thunkErrorHandler(res.data, dispatch)
                }
                dispatch(setIsInitialized({value: true}))
            })
            .catch((err) => {
                thunkServerErrorHandler(err, dispatch)
            })
    }
}





