import {Dispatch} from "redux";
import {ResponseType} from '../../api/todolists-api';
import {setAppError, setAppStatus} from '../app-reducer';

export const thunkErrorHandler = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppError({error: data.messages[0]}))
    } else {
        dispatch(setAppError({error: 'some error'}))
    }
    dispatch(setAppStatus({status: 'failed'}))
}


export const thunkServerErrorHandler = (err: { message: string }, dispatch: Dispatch) => {
    if (err.message) {
        dispatch(setAppError({error: err.message}))
    } else {
        dispatch(setAppError({error: 'some error was happened'}))
    }
    dispatch(setAppStatus({status: 'failed'}))
}