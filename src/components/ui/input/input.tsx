import styles from '../input/input.module.scss'
// import React, {FC} from "react"
import cs from "classnames"

interface InputProps {
        name?: string;
        label?: string;
        multiline?: boolean;
        value?: string;
        placeholder?: string;
        className?: string;
}

export const Input: React.FC<InputProps> = ({label, multiline = false, className, placeholder, value}) => {
    return (
        <div className={styles.inputWrapper}> 
            {
                multiline
                ? (
                    <>
                    <label>{ label }</label>
                        <textarea 
                            className={cs(styles.input, styles.multiline, className)}
                            placeholder={placeholder}
                            value={value}
                        />
                    </>
                ): (
                    <>
                    <label>{ label }</label>
                    <input
                        className={cs(styles.input, styles.oneline, className)}
                        placeholder={placeholder}
                        value={value}
                    />
                    </>
                )

            }
        </div>
    )
};
    
