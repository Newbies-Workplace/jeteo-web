import React from "react";
import styles from "./SecionInfo.module.scss";

interface SecionInfoProps {
  title: string;
  text: string;
  titleClass: string;
}

const SecionInfo: React.FC<SecionInfoProps> = ({ title, text, titleClass}) => {
  return (
    <div className={styles.infoContainer}>
      <h2 className={titleClass}>{title}</h2>
      <p className={styles.infoParagraph}>{text}</p>
    </div>
  );
};

export default SecionInfo;
