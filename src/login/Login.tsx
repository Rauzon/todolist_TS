import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useFormik} from "formik";
import * as yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../state/thunks/auth-thunks";
import {AppRootStateType} from "../state/store";
import { Redirect } from 'react-router-dom';



type LoginPropsType = {}

const validationSchema = yup.object().shape({
    email: yup.string()
        .max(35, 'Must be 25 characters or less')
        .required('email is required')
        .email('email is incorrect'),
    password: yup.string()
        .max(25, 'Must be 25 characters or less')
        .min(5, 'Must be 5 characters or more')
        .required('password is required'),
});


export const Login: React.FC<LoginPropsType> = (props) => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const formik = useFormik({
        validationSchema,
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: (values) => {
            dispatch(loginThunk(values));
        },
    });

    const errorStyle = {
        color: 'red',
    }

    if(isLoggedIn){
        return <Redirect to={'/'} />
    }

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}>here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: vladby86@gmail.com</p>
                        <p>Password: HardPassword_2020</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            name={'email'}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email && formik.touched.email ? (
                            <div style={errorStyle}>{formik.errors.email}</div>
                        ) : null}
                        <TextField
                            type="password"
                            label="Password"
                            name="password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password && formik.touched.password ? (
                            <div style={errorStyle}>{formik.errors.password}</div>
                        ) : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox/>}
                            name={'rememberMe'}
                            {...formik.getFieldProps('rememberMe')}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
