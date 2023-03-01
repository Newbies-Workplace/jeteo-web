import React, {useRef} from "react";
import styles from "./RadioButtons.module.scss"
import cs from "classnames";
import HelpIcon from "../../../assets/icons/help.svg"

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

export const RadioButtons: React.FC<RadioButtonsProps> = ({values, selectedValueIndex, onChange}) => {
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

                        <div className={styles.top}>
                            <input
                                ref={inputRef}
                                type="radio"
                                value={item.id}
                                checked={selectedValueIndex === index}
                                onChange={() => onItemClick(index, item)}/>

                            {item.description !== undefined &&
                                <div className={styles.help}>
                                    <HelpIcon
                                        width={20}
                                        height={20}/>

                                    <span className={styles.helpText}>
                                        {item.description}
                                    </span>
                                </div>
                            }
                        </div>

                        <span className={styles.name}>
                            {item.name}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}