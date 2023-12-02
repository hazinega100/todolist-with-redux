import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    callBack: (newTitle: string) => void
}

export const EditableSpan: React.FC<PropsType> = ({title, callBack}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(title)
    const onEditMode = () => {
        setEditMode(true)
    }
    const onViewMode = () => {
        setEditMode(false)
        callBack(value)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.currentTarget.value
        setValue(newTitle)
    }
    return (
        <>
            {
                editMode
                    ?
                    <input value={value} onChange={onChangeTitle} onBlur={onViewMode} autoFocus />
                    :
                    <span onDoubleClick={onEditMode}>{title}</span>
            }
        </>
    );
};