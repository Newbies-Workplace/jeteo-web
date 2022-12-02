import React from "react";
import styles from "./Lecture.module.scss";
import Mail from "../../../assets/icons/mail.svg";
import Github from "../../../assets/icons/github.svg";
import Twitter from "../../../assets/icons/twitter.svg";
import Linkedin from "../../../assets/icons/linkedin.svg";
import ProfilePic from "../../../assets/images/default-profile-pic.svg";

interface LectureProps {
  title?: string;
  description?: string;
  speaker: {
    name: string
    avatar?: string
    contact: {
      ghLink?: string;
      twLink?: string;
      mailLink?: string;
      liLink?: string;
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
        <div className={styles.userSocialMediaContainer}>
          
          
          {speaker.contact.ghLink !== undefined &&
            <a href={speaker.contact.ghLink} className={styles.userSocialMediaLink}>
              <Github width={"16px"} height={"16px"} />
            </a>
          }
          {speaker.contact.twLink !== undefined && 
          <a href={speaker.contact.twLink} className={styles.userSocialMediaLink}>
            <Twitter width={"16px"} height={"16px"} />
          </a>
          }

          {speaker.contact.mailLink !== undefined && 
          <a href={`mailto:${speaker.contact.mailLink}`} className={styles.userSocialMediaLink}>
            <Mail width={"16px"} height={"16px"} />
          </a>
          }
          {speaker.contact.liLink !== undefined && 
            <a href={speaker.contact.liLink} className={styles.userSocialMediaLink}>
              <Linkedin width={"16px"} height={"16px"} />
            </a>
          }


        </div>
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

