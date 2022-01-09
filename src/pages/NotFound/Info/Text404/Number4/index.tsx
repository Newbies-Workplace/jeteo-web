import { FC } from "react";

import styles from "./styles.css";

import classnames from "classnames";

interface Props {
    side: "left" | "right";
}

export const Number4: FC<Props> = function({ side }) {
    return (
        <h1 className={classnames(styles.number404, {[styles.marginRight]: side === "left"}, {[styles.marginLeft]: side === "right"})}>
            4
        </h1>
    );
};

export default Number4;