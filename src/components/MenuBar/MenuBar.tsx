import React, { FC } from "react";

import Bar from "./Bar";

import styles from "./MenuBar.css";

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