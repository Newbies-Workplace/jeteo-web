import React from 'react'

import { LocationChip } from "./chips/LocationChip";
import { StartDateChip } from "./chips/StartDateChip";

import styles from './EventCard.module.scss'

interface EventCardProps {
    title: string,
    subtitle: string,

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
    if (!color) color = "#4340BE"

    const cardStyle: React.CSSProperties = {
        backgroundColor: `${color}`,
        backgroundImage: `linear-gradient(90deg, ${color}c0, ${color}), url(${image})`,
    }

    return (
        <div style={cardStyle} className={styles.card}>

            {/*{image &&*/}
            {/*    <img className={styles.bgImg} src={image} alt=""/>}*/}

            <div className={styles.name}>
                <h2 className={styles.title}>
                    {title}
                </h2>
                <h3 className={styles.subtitle}>
                    {subtitle}
                </h3>
            </div>

            <div className={styles.bottom}>
                {locationName &&
                    <LocationChip>{locationName}</LocationChip>}

                {startDate &&
                    <StartDateChip date={startDate}/>}
            </div>
        </div>
    )
}