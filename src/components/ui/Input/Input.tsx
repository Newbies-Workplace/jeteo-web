import styles from '../Input/Input.module.scss'
import React from "react"
import cs from "classnames"

interface InputProps {
        name?: string;
        label?: string;
        multiline?: boolean;
        value?: string;
        placeholder?: string;
        required?: boolean;
        className?: string;
}

export const Input: React.FC<InputProps> = ({label, multiline = false, className, placeholder, required = false, value}) => {
    return (
        <div className={styles.inputWrapper}> 
            {
                multiline
                ? (
                    <>
                    <label className={cs( required && styles.required, className)}>{ label }</label>
                        <textarea 
                            className={cs(styles.multiline)}
                            placeholder={placeholder}
                            value={value}
                            required={required}
                        />
                    </>
                ): (
                    <>
                    <label className={cs(required && styles.required, className)} >{ label }</label>
                        <input
                            className={cs(styles.input, styles.oneline)}
                            placeholder={placeholder}
                            value={value}
                            required={required}
                        />
                    </>
                )

            }
        </div>
    )
};
    
