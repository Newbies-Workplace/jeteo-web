import { FC } from "react";

import Bar from "./Bar";

import styles from "./styles.css";

export const MenuBar: FC = function() {
    return (
        <div className={styles.container}>
            <Bar />
            <Bar />
            <Bar />
        </div>
    );
};

export default MenuBar;