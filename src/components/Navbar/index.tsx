import React from "react";

import { NavLink } from "react-router-dom";

import JeteoLogo from "../JeteoLogo";
import MenuBar from "../MenuBar";

import styles from "./styles.css";

const Navbar: React.FC = () => (
    <div className={styles.container}>
        <NavLink className={styles.link} to="/">
            <JeteoLogo />
        </NavLink>
        <MenuBar />
    </div>
);

export default Navbar;