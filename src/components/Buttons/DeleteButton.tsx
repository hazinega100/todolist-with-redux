import React from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

type PropsType = {
    remove: () => void
    disabled: boolean
}

export const DeleteButton = ({remove, disabled}: PropsType) => {
    return (
        <Tooltip title="Delete">
            <IconButton aria-label="delete"
                        onClick={remove}
                        disabled={disabled}
                        size={"small"}
            >
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </Tooltip>
    );
};