import { FC } from "react";

import PlanetBlueLogo from "../../assets/vectors/planet-blue-logo.svg"

import Theme from "../../types/theme";

import styles from "./styles.css";

import classNames from "classnames";

interface Props {
    theme?: Theme;
}

export const JeteoLogo: FC<Props> = function({ theme }) {
    return (
        <div className={styles.container}>
            <PlanetBlueLogo />
            <p className={classNames(styles.text, styles[theme || "light"])}>
                Jeteo
            </p>
        </div>
    );
};

export default JeteoLogo;