import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
                <input className={error ? "error_border" : ""}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={pressedEnter}
                       style={{borderColor: color, color: color, outline: "none"}}
                />
                <button onClick={onClickAddItem}>+</button>
                {error && <div className="error">Title is required</div>}
            </div>
        );
    }
)