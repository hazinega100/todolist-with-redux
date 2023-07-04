import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    callback: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = ({callback}) => {
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
        setError(false)
        if (e.key === 'Enter') {
            onClickAddItem()
        }
    }
    return (
        <div>
            <input className={error ? "error_border" : ""}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={pressedEnter}
            />
            <button onClick={onClickAddItem}>+</button>
            {error && <div className="error">Title is required</div>}
        </div>
    );
};