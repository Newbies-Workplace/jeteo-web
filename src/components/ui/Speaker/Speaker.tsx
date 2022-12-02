import React from "react";
import styles from "./Speaker.module.scss";
import Mail from "../../../assets/icons/mail.svg";
import Github from "../../../assets/icons/github.svg";
import Twitter from "../../../assets/icons/twitter.svg";
import cs from 'classnames'

interface SpeakerProps {
  title?: string;
  description?: string;
  speaker: {
    name: string
    avatar?: string
    contact?: {
      ghLink?: string;
      twLink?: string;
      mailLink?: string;
    }
  }
  status?: {
    color: string
    content: React.ReactNode
  }
}

const Speaker: React.FC<SpeakerProps> = ({
  title,
  description,
  speaker,
  status,
}) => {
  return (
    <div className={styles.prelegendContainer}>
      <div className={styles.userContainer}>
        <img src={speaker.icon ?? "https://www.adobe.com/express/create/media_11b1adffc91b8e6206e56adab00fa2bb4da3e694a.jpeg?width=400&format=jpeg&optimize=medium"} className={styles.userIcon} />
        <h4 className={styles.userName}>{speaker.name}</h4>
        <div className={styles.userSocialMediaContainer}>
          {speaker.ghLink !== undefined &&
            <a href={ghLink} className={styles.userSocialMediaLink}>
              <Github width={"16px"} height={"16px"} />
            </a>
          }
          <a href={twLink} className={styles.userSocialMediaLink}>
            <Twitter width={"16px"} height={"16px"} />
          </a>
          <a href={`mailto:${mailLink}`} className={styles.userSocialMediaLink}>
            <Mail width={"16px"} height={"16px"} />
          </a>
        </div>
      </div>
      <div className={styles.prelegendEventInfo}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {status &&
        <span style={{ backgroundColor: status.color }} className={styles.boxBorder}>
          <span>{boxText}</span>
          </span>
      }
    </div>
  );
};
export default Speaker;

