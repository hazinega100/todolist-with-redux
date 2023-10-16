import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    callback: (title: string) => void
    color?: string
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(
    ({callback, color}) => {
        console.log("AddItemForm rendered")
        const [title, setTitle] = useState("")
        const [error, setError] = useState(false)

        const onClickAddItem = () => {
            if (title.trim() !== "") {
                callback(title.trim())
                setTitle("")
            } else {
                setError(true)
            }
        }
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }

        const pressedEnter = (e: KeyboardEvent<HTMLInputElement>) => {
            if (error) {
                setError(false)
            }
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
                           error={error}
                />
                <IconButton onClick={onClickAddItem} color={"success"}>
                    <AddIcon/>
                </IconButton>
            </div>
        );
    }
)