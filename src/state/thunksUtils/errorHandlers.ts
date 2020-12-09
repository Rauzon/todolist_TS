import {Dispatch} from "redux";
import {ResponseType} from '../../api/todolists-api';
import {ActionsAppType, setAppError, setAppStatus} from '../app-reducer';

export const thunkErrorHandler = <T>(data: ResponseType<T>, dispatch: Dispatch<ActionsAppType>) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('some error'))
    }
    dispatch(setAppStatus('failed'))
}


export const thunkServerErrorHandler = (err: { message: string }, dispatch: Dispatch<ActionsAppType>) => {
    if (err.message) {
        dispatch(setAppError(err.message))
    } else {
        dispatch(setAppError('some error was happened'))
    }
    dispatch(setAppStatus('failed'))
}