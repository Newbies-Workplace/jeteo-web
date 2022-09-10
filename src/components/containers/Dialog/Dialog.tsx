import React from "react"

import styles from "./Dialog.module.css"
import cs from "classnames";

interface DialogProps {
    className?: string
}

const Dialog: React.FC<DialogProps> = ({ children, className }) =>
    <div className={cs(styles.dialog, className)}>
        {children}
    </div>

export default Dialog