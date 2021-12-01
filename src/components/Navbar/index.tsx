import React from "react";

import JeteoLogo from "../JeteoLogo";
import MenuBar from "../MenuBar";

import styles from "./styles.css";

const AppBar: React.FC = function() {
    return (
        <div className={styles.container}>
            <JeteoLogo />
            <MenuBar />
        </div>
    );
};

export default AppBar;