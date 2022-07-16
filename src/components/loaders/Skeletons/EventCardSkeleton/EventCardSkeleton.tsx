import React from 'react';

import styles from './EventCardSkeleton.module.scss'

interface EventCardSkeletonProps {
    opacity?: number
}

export const EventCardSkeleton: React.FC<EventCardSkeletonProps> = ({ opacity }) => (
    <div style={{opacity}} className={styles.card}>
        <div className={styles.title}/>
        <div className={styles.subtitle}/>
    </div>
);
