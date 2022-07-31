import React from "react";

import styles from "./GalaxyBackground.module.css";

import GalaxyBg from "../../../assets/images/GalaxyBg.png";

export const GalaxyBackground: React.FC = ({ children }) => {
    return (
        <div className={styles.wrapper} style={{backgroundImage: `url(${GalaxyBg})`}}>
            {children}
        </div>
    );
};

export default GalaxyBackground;