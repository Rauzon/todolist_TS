import React, {useCallback, useEffect} from 'react'
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
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


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type AppPropsType = {
    demo?: boolean
}

export function AppWithRedux({demo=false,...props}:AppPropsType) {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    useEffect(() => {
        if(demo){
            return
        }

        dispatch(setTodoListThunk())
    },[])

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


    const status = useSelector((state: AppRootStateType) =>state.app.status)

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress/>}
            <ErrorSnackbar />
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist} />
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
            </Container>
        </div>
    );
}
