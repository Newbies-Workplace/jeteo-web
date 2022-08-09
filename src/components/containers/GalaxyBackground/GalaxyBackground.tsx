import React from "react";

import styles from "./GalaxyBackground.module.scss";

export const GalaxyBackground: React.FC = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.stars}/>
            <div className={styles.stars2}/>
            <div className={styles.stars3}/>
            {children}
        </div>
    );
};

export default GalaxyBackground;