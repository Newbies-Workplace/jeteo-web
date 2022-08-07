import React, {createRef, useEffect, useState} from "react";
import styles from "./TagPicker.module.scss"
import {Tag} from "../../../common/models/Tag";
import Close from "../../../assets/vectors/close.svg"
import Add from "../../../assets/vectors/add.svg"
import cs from "classnames";

interface TagPickerProps {
    tags: Tag[]
    value: Tag[]
    maxLength?: number
    onChange: (tags: Tag[]) => void
    onCreate: (newTagName: string) => void
}

interface TagComponentProps {
    label: string
    onRemoveClick: () => void
}

const TagComponent: React.FC<TagComponentProps> = ({label, onRemoveClick}) => (
    <div className={styles.tag}>
        {label}
        <Close className={cs(styles.close, styles.pointer)} onClick={onRemoveClick}/>
    </div>
)

interface DropdownOptionProps {
    icon?: React.ReactNode
    label: string
    selected: boolean
    onClick: () => void
}

interface Option {
    key: string
    icon?: React.ReactNode
    label: string
    onClick: () => void
}

const DropdownOption: React.FC<DropdownOptionProps> = ({icon, label, selected, onClick}) => (
    <div className={cs(styles.dropdownOption, {[styles.selected]: selected})} onClick={() => onClick()}>
        {label}
        {icon}
    </div>
)

const TagPicker: React.FC<TagPickerProps> = ({tags, value, maxLength = 20, onChange, onCreate}) => {
    const inputRef = createRef<HTMLInputElement>()
    const [inputValue, setInputValue] = useState<string>('')
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false)
    const [dropdownOptions, setDropdownOptions] = useState<Option[]>([])
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1)

    useEffect(() => {
        const dropdownTags: Tag[] = tags
            .filter(t => !value.includes(t))
            .filter(t => t.name.toLowerCase().startsWith(inputValue.toLowerCase()))
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(0, 10)

        const options: Option[] = []

        options.push(...dropdownTags.map((tag) => ({
            key: tag.id,
            label: tag.name,
            onClick: () => onTagAddClick(tag),
        })))

        if (tags.findIndex(t => t.name.toLowerCase() === inputValue.toLowerCase()) === -1) {
            options.push({
                key: 'add',
                icon: <Add className={styles.close}/>,
                label: "Dodaj: " + inputValue.trim(),
                onClick: () => onTagCreateClick(),
            })
        }

        setDropdownOptions(options)
    }, [tags, inputValue, value])

    useEffect(() => {
        setSelectedOptionIndex(0)
    }, [dropdownOptions])

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

    const onKeyUp = () => {
        if (selectedOptionIndex > 0) {
            setSelectedOptionIndex((num) => num - 1)
        }
    }

    const onKeyDown = () => {
        if (selectedOptionIndex < dropdownOptions.length - 1) {
            setSelectedOptionIndex((num) => num + 1)
        }
    }

    const onInputSubmit = () => {
        dropdownOptions[selectedOptionIndex]?.onClick()
    }

    return (
        <div>
            <div
                className={styles.container}
                onClick={() => inputRef.current?.focus()}
                onKeyDown={(e) => {
                    switch (e.key) {
                        case "Enter":
                            e.preventDefault()
                            return onInputSubmit()
                        case "ArrowUp":
                            e.preventDefault()
                            return onKeyUp()
                        case "ArrowDown":
                            e.preventDefault()
                            return onKeyDown()
                    }
                }} >
                {value.map((tag) => (
                    <TagComponent
                        key={tag.id}
                        label={tag.name}
                        onRemoveClick={() => onTagRemoveClick(tag)}/>
                ))}

                <div className={styles.inputContainer}>
                    <input
                        ref={inputRef}
                        className={styles.input}
                        type={'text'}
                        value={inputValue}
                        maxLength={maxLength}
                        placeholder={'Wybierz tag...'}
                        onChange={(e) => setInputValue(e.target.value)}/>

                    {inputValue.length !== 0
                        ? <Close className={cs(styles.close, styles.pointer)} onClick={() => setInputValue('')}/>
                        : <div className={styles.close}/>
                    }
                </div>
            </div>

            {dropdownVisible && dropdownOptions.length !== 0 && (
                <div className={styles.dropdown}>
                    {dropdownOptions.map((option, i) =>
                        <DropdownOption
                            key={option.key}
                            icon={option.icon}
                            selected={i === selectedOptionIndex}
                            label={option.label}
                            onClick={() => option.onClick()} />
                    )}
                </div>
            )}
        </div>
    )
}

export default TagPicker