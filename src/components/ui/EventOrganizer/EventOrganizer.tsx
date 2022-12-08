import React from "react";
import { SocialLinks } from "../SocialLinks/SocialLinks";
import styles from "./EventOrganizer.module.scss"

interface EventOrganizerProps {
    logo: string;
    name: string;
    bio: string;
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
            <img className={styles.organizerLogo} src={logo}/>
            <span className={styles.organizerName}>{name}</span>
            <SocialLinks links={links} className={styles.organizerLinksWrapper}/>
            <p className={styles.organizerBio}>{bio}</p>
        </div>
    )
}
