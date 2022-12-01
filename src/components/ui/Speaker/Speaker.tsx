import React from "react";
import styles from "./Speaker.module.scss";
import Mail from "../../../assets/icons/mail.svg";
import Github from "../../../assets/icons/github.svg";
import Twitter from "../../../assets/icons/twitter.svg";
import cs from 'classnames'



const prelegendStyle = {
    content: '',
    width: 'calc(100% + 8px)',
    height: 'calc(100% + 24px)',
    zIndex: '-2',
    borderRadius: '16px',
    position: 'absolute',
    marginTop: '-4px',
    backgroundColor: '#5452C3'
}

// const prelegendStyle: { [key: string]: React.CSSProperties } = {


interface SpeakerProps {
  name?: string;
  title?: string;
  description?: string;
  icon?: string;
  status?: "inProgress" | "previous" | "without";
  boxText?: string;
  ghLink?: string;
  twLink?: string;
  mailLink?: string;
}


// cs(styles.button, {
//   [styles.primary]: primary,
//   [styles.medium]: size === 'medium',
//   [styles.small]: size === 'small',
// })
// {styles.prelegendContainer}




const Speaker: React.FC<SpeakerProps> = ({
  name,
  title,
  description,
  icon,
  status,
  boxText,
  ghLink,
  twLink,
  mailLink,
}) => {
  return (
    <div className={styles.prelegendContainer}>
      <div className={styles.userContainer}>
        {icon ? <img src={icon} className={styles.userIcon} /> : <img src={"https://www.adobe.com/express/create/media_11b1adffc91b8e6206e56adab00fa2bb4da3e694a.jpeg?width=400&format=jpeg&optimize=medium"} className={styles.userIcon} />}
        <h4 className={styles.userName}>{name}</h4>
        <div className={styles.userSocialMediaContainer}>
          <a href={ghLink} className={styles.userSocialMediaLink}>
            <Github width={"16px"} height={"16px"}/>
          </a>
          <a href={twLink} className={styles.userSocialMediaLink}>
            <Twitter width={"16px"} height={"16px"}/>
          </a>
          <a href={`mailto:${mailLink}`} className={styles.userSocialMediaLink}>
            <Mail width={"16px"} height={"16px"}/>
          </a>
        </div>
      </div>
      <div className={styles.prelegendEventInfo}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {status !== 'without' ? <span className={cs( styles.boxBorder, {
        [styles.inProgress]: status == "inProgress",
        [styles.previous]: status == "previous",
      })}><span>{boxText}</span></span> : ''}
    </div>
  );
};
export default Speaker;

