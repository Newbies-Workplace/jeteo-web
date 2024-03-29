import React from "react";
import { SocialLinks } from "../SocialLinks/SocialLinks";
import styles from "./EventOrganizer.module.scss"
import {Avatar} from "../../atoms/Avatar/Avatar";

interface EventOrganizerProps {
    logo?: string;
    name: string;
    description?: string;
    links: {
        githubLink?: string;
        twitterLink?: string;
        emailLink?: string;
        linkedInLink?: string;
    }
}

export const EventOrganizer: React.FC<EventOrganizerProps> = (
    {
        logo,
        name,
        description,
        links,
    }
) => {
    return (
        <div className={styles.organizerCard}>
            <Avatar
                url={logo}
                className={styles.organizerLogo}/>

            <span className={styles.organizerName}>
                {name}
            </span>

            {links &&
                <SocialLinks
                    links={links}
                    className={styles.organizerLinksWrapper}/>
            }

            {description &&
                <p className={styles.organizerBio}>
                    {description}
                </p>
            }
        </div>
    )
}
