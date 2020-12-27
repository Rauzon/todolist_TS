import {Dispatch} from "redux";
import {authAPI, LoginType} from "../../api/todolists-api";
import {setIsLoggedIn} from "../auth-reducer";
import {setAppStatus} from "../app-reducer";
import {thunkErrorHandler, thunkServerErrorHandler} from "../thunksUtils/errorHandlers";


export const loginThunk = (data: LoginType) => {

    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        authAPI.login(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedIn({isLoggedIn: true}))
                    dispatch(setAppStatus({status: 'succeeded'}))
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

    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        authAPI.logOut()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedIn({isLoggedIn: false}))
                    dispatch(setAppStatus({status: 'succeeded'}))
                } else {
                    thunkErrorHandler(res.data, dispatch)
                }
            })
            .catch((err) => {
                thunkServerErrorHandler(err, dispatch)
            })
    }
}