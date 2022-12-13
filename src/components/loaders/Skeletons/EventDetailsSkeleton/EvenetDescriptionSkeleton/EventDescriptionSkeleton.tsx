import React from "react";
import styles from './EventDescriptionSkeleton.module.scss'

export const EventDescriptionSkeleton: React.FC = () => (
    <div className={styles.eventDescriptionSkeleton}>
        {[...Array(5)].map(el => {
            const randomLength = Math.floor(Math.random() * (20 - 70) + 20)
            return (
            <span key={el} style={{width: randomLength}}/>
        )})}
    </div>
)
