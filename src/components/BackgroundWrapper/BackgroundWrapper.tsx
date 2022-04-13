import React, { FC } from "react";

import styles from "./BackgroundWrapper.css";

import GalaxyBg from "../../assets/images/GalaxyBg.png";

export const BackgroundWrapper: FC = function({ children }) {
    return (
        <div className={styles.wrapper} style={{backgroundImage: `url(${GalaxyBg})`}}>
            {children}
        </div>
    );
};

export default BackgroundWrapper;