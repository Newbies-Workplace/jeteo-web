import React from "react";

import styles from "./styles.css";

const MenuBar: React.FC = function() {
    return (
        <div className={styles.container}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
        </div>
    );
};

export default MenuBar;