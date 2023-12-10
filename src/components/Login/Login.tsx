import React from "react";
import {useFormik} from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {CheckBox} from "@mui/icons-material";
import {FormControlLabel, FormGroup} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setIsLoggedInTC} from "../../state/reducers/auth-reducer";
import {AppDispatchType, RootStateType} from "../../state/store";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const dispatch = useDispatch<AppDispatchType>()
    const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues: {
            email: 'hazinega@gmail.com',
            password: 'Kentment100',
        },
        onSubmit: (values) => {
            dispatch(setIsLoggedInTC(values.email, values.password))
        },
    });
    if (isLoggedIn) {
        return <Navigate to={'/'} />
    }
    return (
            <Grid container justifyContent="center">
                <Grid xs={2}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <TextField
                                margin="normal"
                                id="email"
                                name="email"
                                label="Email"
                                fullWidth
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                margin="normal"
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                fullWidth
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <FormControlLabel control={<CheckBox />} label="Remember Me"/>
                            <Button color="primary" variant="contained" fullWidth type="submit">
                                Login
                            </Button>
                        </FormGroup>
                    </form>
                </Grid>
            </Grid>
    );
};