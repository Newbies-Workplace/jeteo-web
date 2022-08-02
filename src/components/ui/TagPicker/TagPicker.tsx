import React, {useState} from "react";

import styles from "./TagPicker.module.scss"
import {Tag} from "../../../common/models/Tag";
import Close from "../../../assets/vectors/close.svg"

interface TagPickerProps {
    tags: Tag[]
    value: Tag[]
    onChange: (tags: Tag[]) => void
    onCreate: (newTagName: string) => void
}

interface TagProps {
    label: string
    onRemoveClick: () => void
}

const TagComponent: React.FC<TagProps> = ({label, onRemoveClick}) => (
    <div className={styles.tag}>
        {label}
        <Close className={styles.close} onClick={onRemoveClick}/>
    </div>
)

const TagPicker: React.FC<TagPickerProps> = ({tags, value, onChange, onCreate}) => {
    const [newTagName, setNewTagName] = useState('')

    const onTagRemoveClick = (tag: Tag) => {
        onChange(value.filter(t => t.id !== tag.id))
    }

    return (
        <div className={styles.container}>
            {value.map((tag) => (
                <TagComponent
                    key={tag.id}
                    label={tag.name}
                    onRemoveClick={() => onTagRemoveClick(tag)}/>
            ))}
            <form onSubmit={(e) => {
                e.preventDefault()
                setNewTagName('')
                onCreate(newTagName)
            }}>
                <input
                    className={styles.input}
                    type={'text'}
                    value={newTagName}
                    placeholder={'Wybierz tag...'}
                    onChange={(e) => {
                        setNewTagName(e.target.value)
                    }} />
            </form>
        </div>
    )
}

export default TagPicker