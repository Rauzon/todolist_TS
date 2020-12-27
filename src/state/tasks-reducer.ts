import {TasksStateType} from '../App';
import {addTodolistAC, removeTodolistAC, setTodolistAC} from './todolists-reducer';
import {TaskType, TodolistType, UpdateTaskModelType} from '../api/todolists-api'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: TasksStateType = {}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task);
        },
        updateTaskAC(state, action: PayloadAction<{ task: TaskType, taskId: string, todolistId: string }>) {
            let todolistTasks = state[action.payload.todolistId];
            // найдём нужную таску:
            const index = todolistTasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                todolistTasks[index] = {...todolistTasks[index], ...action.payload.task}
            }
        },
        setTaskAC(state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: {
        [removeTodolistAC.type]: (state, action: PayloadAction<{ todolistId: string }>) => {
            delete state[action.payload.todolistId];
        },
        [addTodolistAC.type]: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state[action.payload.todolist.id] = []
        },
        [setTodolistAC.type]: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = []
            })
        },
    }
});

export const tasksReducer = tasksSlice.reducer

export const {addTaskAC, removeTaskAC, setTaskAC, updateTaskAC} = tasksSlice.actions