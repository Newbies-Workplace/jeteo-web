import React from 'react'
import styles from "./chipStyles.module.css";
import ClockIcon from "../../../../assets/images/icons/clock.svg";
import dayjs, {ConfigType, Dayjs} from "dayjs";

interface StartDateChipProps {
    date: ConfigType | Dayjs
}

export const StartDateChip: React.FC<StartDateChipProps> = ({date}) => {
    const startDate = dayjs(date)

    return (
        <div className={styles.chip}>
            <ClockIcon/>
            <span className={styles.text}>
                {/* display date with year only if year is different for current*/}
                {startDate.format(`D MMMM ${startDate.year() !== dayjs().year() ? 'YYYY' : ''}, HH:mm`)}
            </span>
        </div>
    )
}