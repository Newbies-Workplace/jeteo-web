import React from "react";

import PlanetBlue from "../../assets/images/planet-blue.svg";

import NotFoundPageTextNumber4 from "../NotFoundPageTextNumber4";

import styles from "./styles.css";

const NotFoundPageText: React.FC = () => (
    <div className={styles.container}>
        <NotFoundPageTextNumber4 side="left" />
        <PlanetBlue />
        <NotFoundPageTextNumber4 side="right" />
    </div>
);

export default NotFoundPageText;