import React from "react";
import styles from "./LectureCard.module.scss";
import {SocialLinks} from "../SocialLinks/SocialLinks";
import {Avatar} from "../../atoms/Avatar/Avatar";

interface LectureProps {
    title?: string
    description?: string
    speaker: {
        name: string
        avatar?: string
        contact: {
            githubLink?: string
            twitterLink?: string
            emailLink?: string
            linkedInLink?: string
        }
    }
    status?: {
        color: string
        content?: React.ReactNode
    }
}

const LectureCard: React.FC<LectureProps> = (
    {
        title,
        description,
        speaker,
        status,
    }
) => {
    return (
        <div
            style={
                status?.color
                    ? {backgroundColor: status?.color}
                    : {
                        backgroundColor: "transparent",
                        boxShadow: 'none'
                    }
            }
            className={styles.boxBorder}>
            <div className={styles.lectureContainer}>
                <div className={styles.userContainer}>
                    <Avatar
                        url={speaker?.avatar}
                        className={styles.userIcon}/>

                    <h4 className={styles.userName}>
                        {speaker.name}
                    </h4>
                    <SocialLinks
                        links={speaker.contact}
                        className={styles.userSocialMediaContainer}/>
                </div>

                <div className={styles.lectureEventInfo}>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </div>

            {status?.content}
        </div>
    );
};
export default LectureCard;

