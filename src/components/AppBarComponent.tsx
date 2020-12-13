import React, {useCallback} from 'react'
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {logOutThunk} from "../state/thunks/auth-thunks";


export function AppBarComponent() {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const logOutHandler = useCallback(() => {
        dispatch(logOutThunk())
    }, [])

    return <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
                <Menu/>
            </IconButton>
            <Typography variant="h6">
                News
            </Typography>
            {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Log out</Button>}
        </Toolbar>
    </AppBar>
}
