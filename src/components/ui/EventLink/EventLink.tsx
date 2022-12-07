import React from "react";
import styles from "./EventLink.module.scss" 

interface SocialLinkProps {
    name: string
    url: string
    icon?: React.ReactNode
}

const EventLink: React.FC<SocialLinkProps> = ({name, url, icon}) => {

    return (
        <a href={url} className={styles.eventLinkContainer} >
            {icon}
            <span className={styles.eventLinkName}>{name}</span>
        </a>
    )
}

export default EventLink;