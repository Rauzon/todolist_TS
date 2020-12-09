import {Dispatch} from "redux";
import {todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {addTaskAC, removeTaskAC, setTaskAC, updateTaskAC} from "../tasks-reducer";
import {AppRootStateType} from "../store";
import {setAppError, setAppStatus} from "../app-reducer";
import {thunkErrorHandler, thunkServerErrorHandler} from "../thunksUtils/errorHandlers";

type SetTasksThunkType = (todolistId: string) => Function
type CreateTasksThunkType = (title: string, todolistId: string) => Function
type DeleteTasksThunkType = (todolistId: string, taskId: string) => Function
type UpdateTitleTaskThunkType = (taskId: string, todolistId: string, model: UpdateTaskDomainModelType) => Function

export const setTasksThunk: SetTasksThunkType = (todolistId) => {

    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTaskAC(res.data.items, todolistId))
                dispatch(setAppStatus('succeeded'))
            })
            .catch(err => {
                if (err.message) {
                    dispatch(setAppError(err.message))
                } else {
                    dispatch(setAppError(err))
                }
                dispatch(setAppStatus('failed'))
            })
    }
}
export const cteateTaskThunk: CreateTasksThunkType = (title, todolistId) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus("loading"))
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
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
export const deleteTaskThunk: DeleteTasksThunkType = (todolistId, taskId) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus("loading"))
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(taskId, todolistId))
                    dispatch(setAppStatus("succeeded"))
                } else {
                    thunkErrorHandler(res.data, dispatch)
                }
            })
            .catch(err => {
                thunkServerErrorHandler(err, dispatch)
            })
    }
}

export type UpdateTaskDomainModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export const UpdateTaskThunk: UpdateTitleTaskThunkType = (todolistId, taskId, model) => {

    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const state = getState()

        const task = state.tasks[todolistId].find((t) => t.id === taskId)

        if (task) {
            const apiModel: UpdateTaskModelType = {
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                status: task.status,
                title: task.title,
                ...model
            }

            todolistsAPI.updateTask(todolistId, taskId, apiModel)
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC(taskId, todolistId, res.data.data.item))
                        setAppStatus('succeeded')
                    } else {
                        thunkErrorHandler(res.data,dispatch)
                    }
                })
                .catch(err => {
                    thunkServerErrorHandler(err, dispatch)
                })
        }


    }
}