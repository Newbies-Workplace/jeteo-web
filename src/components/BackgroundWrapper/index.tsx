import { FC, PropsWithChildren } from "react";

import styles from "./styles.css";

import GalaxyBg from "../../assets/images/GalaxyBg.png";

export const BackgroundWrapper: FC<PropsWithChildren<{}>> = function({ children }) {
    return (
        <div className={styles.wrapper} style={{backgroundImage: `url(${GalaxyBg})`}}>
            {children}
        </div>
    );
};

export default BackgroundWrapper;