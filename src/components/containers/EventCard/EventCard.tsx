import React from 'react'
import {LocationChip} from "./chips/LocationChip";
import {StartDateChip} from "./chips/StartDateChip";
import dayjs from 'dayjs';

import styles from './EventCard.module.scss'
import { Link } from 'react-router-dom';

interface EventCardProps {
    title: string,
    subtitle?: string,

    color?: string,
    image?: string,

    startDate?: Date,
    locationName?: string,
    link: string
}

export const EventCard: React.FC<EventCardProps> = ({
    title,
    subtitle,
    color,
    image,
    startDate,
    locationName,
    link,
}) => {
    // color fallback
    if (!color) color = "#4fd0bd"

    const cardStyle: React.CSSProperties = {
        backgroundColor: `${color}`,
        backgroundImage: `linear-gradient(90deg, ${color}a0, ${color}), url(${image})`,
    }

    const currentDate = dayjs()
    const eventDate = dayjs(startDate)
    const timeToEvent = eventDate.diff(currentDate, "hours");
    const timeAfterEvent = currentDate.diff(eventDate, "hours");
    
    return (
        <>
        <div className={styles.cardWrapper}>
        <Link to={link} className={styles.link}>
            <div style={cardStyle} className={styles.card}>
                <h2 className={styles.title}>
                    {title}
                </h2>
                <h3 className={styles.subtitle}>
                    {subtitle}
                </h3>

                <div className={styles.infoSection}>
                <div className={styles.bottom}>
                    {locationName &&
                        <LocationChip>{locationName}</LocationChip>}

                    {startDate &&
                        <StartDateChip date={startDate}/>}
                </div>
                    {timeToEvent <= 72 && timeToEvent >= 0 &&
                        <div className={styles.timeToEvent}>
                            <span>{timeToEvent}h do rozpoczęcia</span>
                        </div>
                    }
                </div>
            </div>
        </Link>
        {timeAfterEvent <= 24 && timeAfterEvent >= 0 &&
            <Link to={link} className={styles.eventRating}>
                <span className={styles.clickToRate}>Kliknij aby ocenić</span>
                <span className={styles.timeAfterEventText}>zakończono: {timeAfterEvent}h temu</span>
            </Link>
        }
        </div>
        </>
    )
};