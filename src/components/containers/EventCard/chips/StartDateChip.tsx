import React from 'react'
import styles from "./chipStyles.module.css";
import ClockIcon from "../../../../assets/images/icons/clock.svg";
import dayjs, {ConfigType, Dayjs} from "dayjs";

interface StartDateChipProps {
    date: ConfigType | Dayjs
}

export const StartDateChip: React.FC<StartDateChipProps> = ({date}) => {

    // display date with year only if year is different from current year
    const toFormattedLabel = (eventDate: Dayjs, currentDate = dayjs()) =>
        eventDate.format(`D MMMM ${eventDate.year() !== currentDate.year() ? 'YYYY' : ''}, HH:mm`)

    return (
        <div className={styles.chip}>
            <ClockIcon/>
            <span className={styles.text}>
                {toFormattedLabel(dayjs(date))}
            </span>
        </div>
    )
}