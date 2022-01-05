import React from "react";

import styles from "./styles.css";

import GalaxyBg from "../../assets/images/GalaxyBg.png";

const BackgroundWrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => <div className={styles.wrapper} style={{backgroundImage: `url(${GalaxyBg})`}}>{children}</div>;

export default BackgroundWrapper;