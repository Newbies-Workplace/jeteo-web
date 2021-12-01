import React from "react";

import PlanetBlueLogo from "../../assets/vectors/planet-blue-logo.svg"

import styles from "./styles.css";

const JeteoLogo: React.FC = function() {
    return (
        <div className={styles.container}>
            <PlanetBlueLogo />
            <p className={styles.text}>
                Jeteo
            </p>
        </div>
    )
};

export default JeteoLogo;