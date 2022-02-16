import { FC } from "react";

import PlanetYellow from "../../../../assets/vectors/planet-yellow.svg";

import Number4 from "./Number4/Number4";

import styles from "./Text404.css";

export const Text404: FC = function() {
    return (
        <div className={styles.container}>
            <Number4 side="left" />
            <PlanetYellow />
            <Number4 side="right" />
        </div>
    );
};

export default Text404;