import React from "react";
import styles from "./Toolbar.module.scss";
import BackArrow from "../../../assets/icons/back-arrow.svg"

interface StudioToolbarProps {
    title: string
    onBackPress?: () => void
}

export const Toolbar: React.FC<StudioToolbarProps> = ({title, onBackPress}) => {
    return (
        <div className={styles.container}>
            {onBackPress &&
                <BackArrow
                    width={24}
                    height={24}
                    className={styles.backArrow}
                    onClick={() => onBackPress()}/>
            }

            <span>{title}</span>
        </div>
    )
}