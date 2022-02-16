import React from "react";

import { NavLink } from "react-router-dom";

import JeteoLogo from "../JeteoLogo/JeteoLogo";
import MenuBar from "../MenuBar/MenuBar";

import styles from "./Navbar.css";

const Navbar: React.FC = () => (
    <div className={styles.container}>
        <NavLink className={styles.link} to="/">
            <JeteoLogo />
        </NavLink>
        <MenuBar />
    </div>
);

export default Navbar;