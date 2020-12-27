import {TodolistType} from '../api/todolists-api'
import {RequestStatusType} from "./app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";



const initialState: Array<TodolistDomainType> = [];

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            let index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            let newTodolist: TodolistDomainType = {...action.payload.todolist, filter: "all", entityStatus: "idle"}
            state.unshift(newTodolist)
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.payload.title;
            }
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.payload.filter;
            }
        },
        setTodolistAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(tl => {
                return {...tl, filter: "all", entityStatus: "idle"}
            })
        },
        changeTodoListEntityAC(state, action: PayloadAction<{ entityStatus: RequestStatusType, todolistId: string }>) {
            return state.map((tl) => tl.id === action.payload.todolistId ?
                {...tl, entityStatus: action.payload.entityStatus} : tl)
        },
    }
});

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todolistsReducer = todolistsSlice.reducer;

export const {
    addTodolistAC,
    changeTodoListEntityAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistAC
} = todolistsSlice.actions