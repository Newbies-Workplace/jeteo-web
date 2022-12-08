import React from "react";
import { Link } from "react-router-dom";

import BackArrowSvg from "../../../assets/icons/left-arrow-rounded.svg";

import styles from './EventHeadline.module.scss'


interface EventDetailsHeadlineProps {
  title: string;
  subtitle: string;
}

export const EventHeadline: React.FC<EventDetailsHeadlineProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className={styles.content}>
      <Link className={styles.backArrow} to={"/"}>
        <BackArrowSvg />
      </Link>

      <div className={styles.text}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subtitle}>{subtitle}</h2>
      </div>
    </div>
  );
};
