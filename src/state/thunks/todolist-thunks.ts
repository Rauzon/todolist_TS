import {todolistsAPI} from "../../api/todolists-api";
import {addTodolistAC, changeTodolistTitleAC, removeTodolistAC, setTodolistAC, changeTodoListEntityAC} from "../todolists-reducer";
import {Dispatch} from "redux";
import {setAppError, setAppStatus} from "../app-reducer";
import {addTaskAC} from "../tasks-reducer";

type SetTodoListThunkType = () => Function
type DeleteTodoListThunkType = (todolistId: string) => Function
type CreateTodoListThunkType = (title: string) => Function
type UpdateTitleTodoListThunkType = (todolistId: string, title: string) => Function

export const setTodoListThunk: SetTodoListThunkType = () => {

    return (dispatch: Dispatch) => {
        dispatch(setAppStatus("loading"))
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistAC(res.data))
                dispatch(setAppStatus("succeeded"))
            })

    }
}

export const deleteTodoListThunk: DeleteTodoListThunkType = (todolistId) => {

    return (dispatch: Dispatch) => {
        dispatch(setAppStatus("loading"))
        dispatch(changeTodoListEntityAC("loading", todolistId))
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC(todolistId))
                    dispatch(setAppStatus("loading"))
                }
            })

    }
}
export const createTodoListThunk: CreateTodoListThunkType = (title) => {

    return async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatus("loading"))
            let res = await todolistsAPI.createTodolist(title)
                .then(res => {
                    dispatch(changeTodoListEntityAC("loading", res.data.data.item.id))
                    if (res.data.resultCode === 0) {
                        dispatch(addTodolistAC(res.data.data.item))
                        dispatch(setAppStatus("succeeded"))
                    } else {
                        dispatch(setAppError(res.data.messages[0]))
                        dispatch(setAppStatus("failed"))
                    }
                })
        } catch (err) {
            dispatch(setAppStatus("succeeded"))
            throw Error(err)
        }
    }
}
export const updateTitleTodoListThunk: UpdateTitleTodoListThunkType = (todolistId, title) => {

    return (dispatch: Dispatch) => {
        dispatch(setAppStatus("loading"))
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => {
                dispatch(changeTodolistTitleAC(todolistId, title))
            })
    }
}
