import React, {useCallback, useEffect} from 'react'
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {CircularProgress, Container, Grid, LinearProgress, Paper} from '@material-ui/core';
import {changeTodolistFilterAC, FilterValuesType, TodolistDomainType} from './state/todolists-reducer'
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskStatuses, TaskType} from './api/todolists-api'
import {
    createTodoListThunk,
    deleteTodoListThunk,
    setTodoListThunk,
    updateTitleTodoListThunk
} from "./state/thunks/todolist-thunks";
import {cteateTaskThunk, deleteTaskThunk, UpdateTaskThunk} from "./state/thunks/tasks-thunks";
import {ErrorSnackbar} from "./components/ErrorSnackBar";
import {Redirect, Route} from 'react-router-dom';
import {Login} from "./login/Login";
import {RequestStatusType} from "./state/app-reducer";
import {initializeAppThunk} from './state/thunks/app-thunks';
import {AppBarComponent} from "./components/AppBarComponent";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type AppPropsType = {
    demo?: boolean
}

export function AppWithRedux({demo = false, ...props}: AppPropsType) {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const status = useSelector<AppRootStateType, RequestStatusType>((state: AppRootStateType) => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const isInitializedApp = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch();

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(setTodoListThunk())
    }, [isLoggedIn])

    //for initialization
    useEffect(() => {
        dispatch(initializeAppThunk())
    }, [])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(deleteTaskThunk(todolistId, id));
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(cteateTaskThunk(title, todolistId))
    }, []);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(UpdateTaskThunk(todolistId, id, {status}));
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        dispatch(UpdateTaskThunk(todolistId, id, {title: newTitle}));
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(deleteTodoListThunk(id));
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(updateTitleTodoListThunk(id, title));
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodoListThunk(title));
    }, [dispatch]);

    if (!isInitializedApp) {
        return <div className={'app__progress_circle'}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <AppBarComponent />
            {status === 'loading' && <LinearProgress/>}
            <ErrorSnackbar/>
            <Route path={'/login'} render={() => <Login/>}/>
            {
                !isLoggedIn && <Redirect to={'/login'}/>
            }
            <Route exact path={'/'} render={() => <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        entityStatus={tl.entityStatus}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                        demo={demo}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>}/>

        </div>
    );
}
