import React, {useRef} from "react";
import styles from "./RadioButtons.module.scss"
import cs from "classnames";

interface RadioItem {
    id: string
    name: string
}

interface RadioButtonsProps {
    values: RadioItem[]
    selectedValueIndex: number
    onChange: (value: RadioItem) => void
}

const RadioButtons: React.FC<RadioButtonsProps> = ({values, selectedValueIndex, onChange}) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const onItemClick = (index: number, item: RadioItem) => {
        if (index !== selectedValueIndex) {
            onChange(item)
        }
    }

    return (
        <div className={styles.container}>
            {values.map((item, index) => {
                return (
                    <div
                        className={
                            cs(styles.item, {
                                [styles.selected]: selectedValueIndex === index
                            })
                        }
                        onClick={() => onItemClick(index, item)}
                        key={item.id}>
                        <input
                            className={styles.input}
                            ref={inputRef}
                            type="radio"
                            value={item.id}
                            checked={selectedValueIndex === index}
                            onChange={() => onItemClick(index, item)}/>

                        <span className={styles.value}>
                            {item.name}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}

export default RadioButtons