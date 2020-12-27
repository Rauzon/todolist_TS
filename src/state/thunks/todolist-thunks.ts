import {todolistsAPI} from "../../api/todolists-api";
import {
    addTodolistAC,
    changeTodoListEntityAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistAC
} from "../todolists-reducer";
import {Dispatch} from "redux";
import {setAppStatus} from "../app-reducer";
import {thunkErrorHandler, thunkServerErrorHandler} from "../thunksUtils/errorHandlers";

type SetTodoListThunkType = () => Function
type DeleteTodoListThunkType = (todolistId: string) => Function
type CreateTodoListThunkType = (title: string) => Function
type UpdateTitleTodoListThunkType = (todolistId: string, title: string) => Function

export const setTodoListThunk: SetTodoListThunkType = () => {

    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistAC({todolists: res.data}))
                dispatch(setAppStatus({status: 'succeeded'}))
            })
            .catch((err) => {
                thunkServerErrorHandler(err, dispatch)
            })
    }
}

export const deleteTodoListThunk: DeleteTodoListThunkType = (todolistId) => {

    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        dispatch(changeTodoListEntityAC({todolistId, entityStatus: "loading"}))
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC({todolistId}))
                    dispatch(setAppStatus({status: 'succeeded'}))
                } else {
                    thunkErrorHandler(res.data, dispatch)
                }
            })
            .catch(err => {
                thunkServerErrorHandler(err, dispatch)
            })

    }
}
export const createTodoListThunk: CreateTodoListThunkType = (title) => {

    return async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatus({status: 'loading'}))
            let res = await todolistsAPI.createTodolist(title)
                .then(res => {
                    dispatch(changeTodoListEntityAC({todolistId: res.data.data.item.id, entityStatus: "loading"}))
                    if (res.data.resultCode === 0) {
                        dispatch(addTodolistAC({todolist: res.data.data.item}))
                        dispatch(setAppStatus({status: 'succeeded'}))
                    } else {
                        thunkErrorHandler(res.data, dispatch)
                    }
                })
        } catch (err) {

        }
    }
}
export const updateTitleTodoListThunk: UpdateTitleTodoListThunkType = (todolistId, title) => {

    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => {
                debugger
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC({title, id: todolistId}))
                    dispatch(setAppStatus({status: 'succeeded'}))
                } else {
                    thunkErrorHandler(res.data, dispatch)
                }
            })
            .catch(err => {
                thunkServerErrorHandler(err, dispatch)
            })
    }
}