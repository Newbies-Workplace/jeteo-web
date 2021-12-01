import React from "react";

import PlanetYellow from "../../assets/vectors/planet-yellow.svg";

import NotFoundPageTextNumber4 from "../NotFoundPageTextNumber4";

import styles from "./styles.css";

const NotFoundPageText: React.FC = () => (
    <div className={styles.container}>
        <NotFoundPageTextNumber4 side="left" />
        <PlanetYellow />
        <NotFoundPageTextNumber4 side="right" />
    </div>
);

export default NotFoundPageText;