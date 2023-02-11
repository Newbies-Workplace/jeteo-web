import React from 'react'
import {LocationChip} from "./chips/LocationChip";
import {StartDateChip} from "./chips/StartDateChip";

import styles from './EventCard.module.scss'

interface EventCardProps {
    title: string,
    subtitle?: string,

    color?: string,
    image?: string,

    startDate?: Date,
    locationName?: string
}

export const EventCard: React.FC<EventCardProps> = ({
    title,
    subtitle,
    color,
    image,
    startDate,
    locationName,
}) => {
    // color fallback
    if (!color) color = "#4fd0bd"

    const cardStyle: React.CSSProperties = {
<<<<<<< HEAD
        backgroundColor: color ?? '#080736'
=======
        backgroundColor: `${color}`,
        backgroundImage: `linear-gradient(90deg, ${color}a0, ${color}), url(${image})`,
>>>>>>> develop
    }

    return (
        <div style={cardStyle} className={styles.card}>
            <h2 className={styles.title}>
                {title}
            </h2>
            <h3 className={styles.subtitle}>
                {subtitle}
            </h3>

            <div className={styles.bottom}>
                {locationName &&
                    <LocationChip>{locationName}</LocationChip>}

                {startDate &&
                    <StartDateChip date={startDate}/>}
            </div>
        </div>
    )
};