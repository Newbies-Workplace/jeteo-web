import React from "react";

import styles from "./styles.css";
import classnames from "classnames";

interface Props {
    side: "left" | "right";
}

const NotFoundPageTextNumber4: React.FC<Props> = ({ side }) => (
    <h1 className={classnames(styles.number404, {[styles.marginRight]: side === "left"}, {[styles.marginLeft]: side === "right"})}>
        4
    </h1>
);

export default NotFoundPageTextNumber4;