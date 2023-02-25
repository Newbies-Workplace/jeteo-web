import React, {useRef} from "react";
import styles from "./RadioButtons.module.scss"
import cs from "classnames";

export interface RadioItem {
    id: string
    name: string
    description?: string
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

                        <div className={styles.texts}>
                            <span className={styles.name}>
                                {item.name}
                            </span>

                            {item.description !== undefined &&
                                <span>
                                    {item.description}
                                </span>
                            }
                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default RadioButtons