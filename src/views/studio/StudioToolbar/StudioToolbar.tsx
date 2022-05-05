import React from "react";
import styles from "./StudioToolbar.module.scss";

interface StudioToolbarProps {
    title: string
    onBackPress?: () => void
}

export const StudioToolbar: React.FC<StudioToolbarProps> = ({title, onBackPress}) => {
    return (
        <div className={styles.container}>
            {onBackPress && <span className={styles.backArrow}>&lt;</span>}

            <span>{title}</span>
        </div>
    )
}