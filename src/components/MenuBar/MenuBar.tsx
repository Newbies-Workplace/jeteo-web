import React, { FC } from "react";

import Bar from "./Bar";

import styles from "./MenuBar.module.css";

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