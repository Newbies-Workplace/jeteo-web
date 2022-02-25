import React from 'react'
import styles from "./chipStyles.css";
import ClockIcon from "../../../../assets/images/icons/clock.svg";

interface StartDateChipProps {
    date: Date
}

export const StartDateChip: React.FC<StartDateChipProps> = ({date}) => (
    <div className={styles.chip}>
        <ClockIcon/>
        <span className={styles.text}>
            {date.toDateString()}
        </span>
    </div>
)