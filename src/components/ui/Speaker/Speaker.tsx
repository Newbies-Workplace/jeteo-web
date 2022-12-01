import React from "react";
import styles from "./Speaker.module.scss";
import Mail from "../../../assets/icons/mail.svg";
import Github from "../../../assets/icons/github.svg";
import Twitter from "../../../assets/icons/twitter.svg";

interface SpeakerProps {
  name?: string;
  title?: string;
  description?: string;
  icon?: string;
}

const Speaker: React.FC<SpeakerProps> = ({
  name,
  title,
  description,
  icon,
}) => {
  return (
    <div className={styles.prelegendContainer}>
      <div className={styles.userContainer}>
        <img src={icon} className={styles.userIcon} />
        <h4 className={styles.userName}>{name}</h4>
        <div className={styles.userSocialMediaContainer}>
          <a href="#" className={styles.userSocialMediaLink}>
            <Github width={"16px"} height={"16px"}/>
          </a>
          <a href="#" className={styles.userSocialMediaLink}>
            <Twitter width={"16px"} height={"16px"}/>
          </a>
          <a href="#" className={styles.userSocialMediaLink}>
            <Mail width={"16px"} height={"16px"}/>
          </a>
        </div>
      </div>
      <div className={styles.prelegendEventInfo}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};
export default Speaker;