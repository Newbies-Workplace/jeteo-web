import styles from '../Input/Input.module.scss'
import React from "react"
import cs from "classnames"

interface InputProps {
    name?: string
    label?: string
    multiline?: boolean
    value: string
    setValue: (value: string) => void
    placeholder?: string
    required?: boolean
    className?: string
}

export const Input: React.FC<InputProps> = (
    {
        label,
        multiline = false,
        className,
        placeholder,
        required = false,
        value,
        setValue,
    }
) => {
    return (
        <div>
            <label className={cs(required && styles.required)}>{label}</label>

            <div className={styles.inputWrapper}>

                {multiline
                    ? <textarea
                        className={cs(styles.multiline, className)}
                        placeholder={placeholder}
                        value={value}
                        onChange={event => setValue(event.target.value)}
                        required={required}/>
                    : <input
                        className={cs(styles.oneline, className)}
                        placeholder={placeholder}
                        value={value}
                        onChange={event => setValue(event.target.value)}
                        required={required}/>
                }
            </div>
        </div>
    )
};
    
