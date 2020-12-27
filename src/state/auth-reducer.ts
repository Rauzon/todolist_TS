import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type InitialAuthStateType = {
    isLoggedIn: boolean
}

const initialState: InitialAuthStateType = {
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
});

export const authReducer = authSlice.reducer


export const {setIsLoggedIn} = authSlice.actions