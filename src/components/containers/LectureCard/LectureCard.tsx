import React from 'react'
import { Link } from 'react-router-dom'

import styles from './LectureCard.css'
import {LocationChip} from "./chips/LocationChip";
import {StartDateChip} from "./chips/StartDateChip";

interface LectureCardProps {
    id: string,
    title: string,
    subtitle: string,

    color?: string,
    image?: string,

    startDate: Date,
    locationName?: string
}

export const LectureCard: React.FC<LectureCardProps> = ({
    id,
    title,
    subtitle,
    color,
    image,
    startDate,
    locationName
}) => {

    const cardStyle: React.CSSProperties = {
        backgroundColor: color || "#080736" //space dark
    }

    return (
        <Link className={styles.link} to={`/lecture/${id}`}>
            <div style={cardStyle} className={styles.card}>
                {image &&
                    <img className={styles.bgImg} src={image} alt=""/>}
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
        </Link>
    )
}