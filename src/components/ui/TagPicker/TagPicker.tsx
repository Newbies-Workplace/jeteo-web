import React, {createRef, useEffect, useState} from "react";

import styles from "./TagPicker.module.scss"
import {Tag} from "../../../common/models/Tag";
import Close from "../../../assets/vectors/close.svg"
import cs from "classnames";

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
        <Close className={cs(styles.close, styles.pointer)} onClick={onRemoveClick}/>
    </div>
)

interface PickableTagComponentProps {
    label: string
    onClick: () => void
}

const PickableTagComponent: React.FC<PickableTagComponentProps> = ({label, onClick}) => (
    <div className={styles.dropdownOption} onClick={() => onClick()}>
        {label}
    </div>
)

const TagPicker: React.FC<TagPickerProps> = ({tags, value, onChange, onCreate}) => {
    const [inputValue, setInputValue] = useState('')
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [dropdownTags, setDropdownTags] = useState<Tag[]>([])
    const inputRef = createRef<HTMLInputElement>()

    useEffect(() => {
        const options = tags.filter(t => !value.includes(t))
            .filter(t => t.name.toLowerCase().startsWith(inputValue.toLowerCase()))
            .sort((a, b) => a.name.localeCompare(b.name))

        setDropdownTags(options)
    }, [tags, inputValue, value])

    useEffect(() => {
        setDropdownVisible(inputValue.length !== 0)
    }, [inputValue])

    const onTagRemoveClick = (tag: Tag) => {
        onChange(value.filter(t => t.id !== tag.id))
    }

    const onTagAddClick = (tag: Tag) => {
        setDropdownVisible(false)
        setInputValue('')
        onChange([...value, tag])
    }

    const onTagCreateClick = () => {
        onCreate(inputValue.trim())
        setInputValue('')
    }

    const onInputSubmit = () => {

    }

    return (
        <>
            <div className={styles.container} onClick={() => inputRef.current?.focus()}>
                {value.map((tag) => (
                    <TagComponent
                        key={tag.id}
                        label={tag.name}
                        onRemoveClick={() => onTagRemoveClick(tag)}/>
                ))}

                <form onSubmit={(e) => {
                    e.preventDefault()
                    onInputSubmit()
                }}>
                    <div className={styles.inputContainer}>
                        <input
                            ref={inputRef}
                            className={styles.input}
                            type={'text'}
                            value={inputValue}
                            placeholder={'Wybierz tag...'}
                            onChange={(e) => setInputValue(e.target.value)} />

                        {inputValue.length !== 0
                            ? <Close className={cs(styles.close, styles.pointer)} onClick={() => setInputValue('')}/>
                            : <div className={styles.close}/>
                        }
                    </div>
                </form>
            </div>
            {dropdownVisible && (
                <div className={styles.dropdown}>
                    {(dropdownTags.length === 0 || (inputValue.length !== 0 && tags.findIndex(t => t.name.toLowerCase() === inputValue.toLowerCase()) === -1)) &&
                        <PickableTagComponent
                            key={'add'}
                            label={"Dodaj: " + inputValue.trim()}
                            onClick={() => onTagCreateClick()}/>
                    }
                    {dropdownTags.map((tag) => (
                        <PickableTagComponent
                            key={tag.id}
                            label={tag.name}
                            onClick={() => onTagAddClick(tag)}/>
                    ))}
                </div>
            )}
        </>
    )
}

export default TagPicker