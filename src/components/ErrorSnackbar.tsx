import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../state/store";
import {setError} from "../state/reducers/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {
    const dispatch = useDispatch()
    const error = useSelector<RootStateType, string | null>(state => state.app.error)
    const isOpen = error !== null

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setError(null))
    };

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose} >
            <Alert onClose={handleClose} severity="error" >
                {error}
            </Alert>
        </Snackbar>
    );
}