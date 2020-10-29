import {Dispatch} from "redux";
import {todolistsAPI} from "../../api/todolists-api";
import {addTaskAC, setTaskAC} from "../tasks-reducer";

type SetTasksThunkType = (todolistId: string) => Function
type CreateTasksThunkType = (title: string, todolistId: string) => Function


export const setTasksThunk: SetTasksThunkType = (todolistId) => {

    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTaskAC(res.data.items, todolistId))
            })
    }
}
export const cteateTaskThunk: CreateTasksThunkType = (title, todolistId) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

