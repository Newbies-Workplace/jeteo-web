import React from "react";
import { Link } from "react-router-dom";

import JeteoLogo from "../JeteoLogo/JeteoLogo";
import MenuBar from "../MenuBar/MenuBar";

import styles from "./Navbar.module.css";

const Navbar: React.FC = () => (
    <div className={styles.container}>
        <Link className={styles.link} to="/">
            <JeteoLogo />
        </Link>
        <MenuBar />
    </div>
);

export default Navbar;