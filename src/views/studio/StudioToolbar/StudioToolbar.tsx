import React from "react";
import styles from "./StudioToolbar.module.scss";
import BackArrow from "../../../assets/vectors/back-arrow.svg"

interface StudioToolbarProps {
    title: string
    onBackPress?: () => void
}

export const StudioToolbar: React.FC<StudioToolbarProps> = ({title, onBackPress}) => {
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