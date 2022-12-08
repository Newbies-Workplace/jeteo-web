import React from "react";
import {Link} from 'react-router-dom'

import BackArrowSvg from '../../../assets/icons/left-arrow-rounded.svg'

import styles from "./EventHeadline.module.scss";

interface EventDetailsHeadlineProps {
    title: string
    subtitle: string
    color?: string
    image?: string
}

export const EventHeadline: React.FC<EventDetailsHeadlineProps> = ({ title, subtitle, color, image }) => {
    // color fallback
    if (!color) color = "#4340BE"

    const cardStyle: React.CSSProperties = {
        backgroundImage: `linear-gradient(90deg, ${color} 0%, ${color}C0 50%, ${color} 100%), url(${image})`,
    }

    return (
        <div style={{background: `${color}`}} className={styles.headline}>
            <div style={cardStyle} className={styles.content}>
                <Link className={styles.backArrow} to={"/"}><BackArrowSvg/></Link>

                <div className={styles.text}>
                    <h1 className={styles.title}>{title}</h1>
                    <h2 className={styles.subtitle}>{subtitle}</h2>
                </div>
            </div>
        </div>
    )
}