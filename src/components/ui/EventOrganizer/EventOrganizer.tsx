import React from "react";
import { SocialLinks } from "../SocialLinks/SocialLinks";
import styles from "./EventOrganizer.module.scss"

interface EventOrganizerProps {
    logo?: string;
    name: string;
    bio?: string;
    links: {
        githubLink?: string;
        twitterLink?: string;
        emailLink?: string;
        linkedInLink?: string;
    }
}

export const EventOrganizer: React.FC<EventOrganizerProps> = ({logo, name, bio, links}) => {
    return (
        <div className={styles.organizerCard}>
            {logo && <img className={styles.organizerLogo} src={logo}/>}
            <span className={styles.organizerName}>{name}</span>
            {links !== undefined && links !== null ? <SocialLinks links={links} className={styles.organizerLinksWrapper}/> : null}
            {bio !== undefined && links !== null ? <p className={styles.organizerBio}>{bio}</p> : null}
        </div>
    )
}
