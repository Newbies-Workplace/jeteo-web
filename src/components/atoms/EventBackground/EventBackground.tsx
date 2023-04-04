import React from "react";
import styles from "./EventBackground.module.scss";

interface EventDetailsHeadlineProps {
    color?: string
    image?: string
}

export const EventBackground: React.FC<EventDetailsHeadlineProps> = ({ color, image }) => {
    // color fallback
    if (!color) color = "#4340BE"

    const cardStyle: React.CSSProperties = {
        backgroundImage: `linear-gradient(90deg, ${color} 0%, ${color}C0 50%, ${color} 100%), url(${image})`,
    }

    return (
        <div style={{background: `${color}`}} className={styles.headline}>
            <div style={cardStyle} className={styles.contentWrapper}>
            </div>
        </div>
    )
}