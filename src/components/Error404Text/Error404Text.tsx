import React from "react";

import Planet404 from "../../assets/images/planet.svg";

import Number4 from "../Number404/Number4";

import styles from "./style.css";

const Error404Text: React.FC = () => (
    <div className={styles.container}>
        <Number4 side="left" />
        <Planet404 />
        <Number4 side="right" />
    </div>
);

export default Error404Text;