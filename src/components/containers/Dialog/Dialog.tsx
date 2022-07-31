import React from "react"

import styles from "./Dialog.module.css"

const Dialog: React.FC = ({ children }) =>
    <div className={styles.contentContainer}>
        <div className={styles.container}>
            {children}
        </div>
    </div>

export default Dialog