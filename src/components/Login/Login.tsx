import React from "react";
import {useFormik} from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {FormControlLabel, FormGroup} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setIsLoggedInTC} from "../../state/reducers/auth-reducer";
import {AppDispatchType, RootStateType} from "../../state/store";
import {Navigate} from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";

export const Login = () => {
    const dispatch = useDispatch<AppDispatchType>()
    const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues: {
            email: 'free@samuraijs.com',
            password: 'free',
            rememberMe: false
        },
        onSubmit: (values) => {
            dispatch(setIsLoggedInTC(values))
        },
    });
    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }
    return (
        <Grid container justifyContent="center">
            <Grid item xl={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField
                            margin="normal"
                            id="email"
                            label="Email"
                            {...formik.getFieldProps("email")}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            margin="normal"
                            id="password"
                            label="Password"
                            type="password"
                            {...formik.getFieldProps("password")}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <FormControlLabel
                            label="Remember Me"
                            control={<Checkbox {...formik.getFieldProps("rememberMe")}
                                               checked={formik.values.rememberMe}
                            />}
                        />
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </Grid>
        </Grid>
    );
};