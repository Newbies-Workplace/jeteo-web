import React from "react";
import styles from "./Lecture.module.scss";
import ProfilePic from "../../../assets/images/default-profile-pic.svg";
import { SocialLinks } from "../SocialLinks/SocialLinks";

interface LectureProps {
  title?: string;
  description?: string;
  speaker: {
    name: string
    avatar?: string
    contact: {
      githubLink?: string;
      twitterLink?: string;
      emailLink?: string;
      linkedInLink?: string;
    }
}
  status?: {
    color: string
    content?: React.ReactNode
  }
}

const Lecture: React.FC<LectureProps> = ({
  title,
  description,
  speaker,
  status,
}) => {
  return (
    <div style={{ backgroundColor: status?.color ?? 'transparent'}} className={styles.boxBorder}>

      <div className={styles.lectureContainer}>

        <div className={styles.userContainer}>
          {speaker.avatar !== undefined ? <img src={speaker.avatar} className={styles.userIcon} /> : <ProfilePic className={styles.userIcon}/>}
          <h4 className={styles.userName}>{speaker.name}</h4>
          <SocialLinks links={speaker.contact} className={styles.userSocialMediaContainer}/>
        </div>

        <div className={styles.prelegendEventInfo}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

      </div>
        
      {status && <>{status.content}</>}

    </div>
  );
};
export default Lecture;

