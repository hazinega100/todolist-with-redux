import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';
import {setError} from "../state/reducers/app-reducer";
import {useDispatch} from "react-redux";

type AddItemFormPropsType = {
    callback: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(
    ({callback}) => {
        console.log("AddItemForm rendered")

        const dispatch = useDispatch()
        const [title, setTitle] = useState("")
        const [errorLocal, setErrorLocal] = useState(false)

        const onClickAddItem = () => {
            if (title.trim() !== "") {
                callback(title.trim())
                setTitle("")
            } else {
                dispatch(setError('title empty'))
                setErrorLocal(true)
            }
        }
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
            setErrorLocal(false)
        }

        const pressedEnter = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                onClickAddItem()
            }
        }
        return (
            <div>
                <TextField id="outlined-basic"
                           size={"small"}
                           value={title}
                           onChange={onChangeHandler}
                           onKeyPress={pressedEnter}
                           label="Title"
                           variant="outlined"
                           error={errorLocal}
                />
                <IconButton onClick={onClickAddItem} color={"success"}>
                    <AddIcon/>
                </IconButton>
            </div>
        );
    }
)