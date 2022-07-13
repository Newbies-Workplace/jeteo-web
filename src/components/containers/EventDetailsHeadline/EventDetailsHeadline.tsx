import React from "react";

import { EventData } from "../../../api/graphql/events/EventDataQuery";

import styles from "./EventDetails.module.scss";

interface EventDetailsHeadlineProps {
    event?: EventData;
};

export const EventDetailsHeadline: React.FC<EventDetailsHeadlineProps> = ({ event }) => {
    const cardStyle: React.CSSProperties = {
        backgroundColor: event?.theme.primaryColor
    };

    return (
        <div style={cardStyle} className={styles.headline}>
            {event?.theme.image &&
                <img className={styles.bgImg} src={event.theme.image} alt=""/>}
            <div className={styles.eventTitle}>
                <p className={styles.title}>
                    {event?.title ? event.title : "Unknown title"}
                </p>
            </div>
            <div>{event?.subtitle ? event.subtitle : "Unknown subtitle"}</div>
        </div>
    )
}

/*
    import React from 'react'
import styles from './EventCard.module.scss'
import {LocationChip} from "./chips/LocationChip";
import {StartDateChip} from "./chips/StartDateChip";

interface EventCardProps {
    id: string,
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

    const cardStyle: React.CSSProperties = {
        backgroundColor: color
    }

    return (
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
    )
}
EventCard.defaultProps = {
    color: "#080736"
}
*/