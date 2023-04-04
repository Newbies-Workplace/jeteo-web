import React, {ReactElement} from "react";

import styles from './NavButton.module.scss';
import cs from "classnames";
import {NavLink} from "react-router-dom";
import {To} from "react-router";

interface StudioNavButtonProps {
    icon: ReactElement
    name: string
    to: To
}

export const NavButton: React.FC<StudioNavButtonProps> = ({icon, name, to}) => {
    return (
        <NavLink className={({isActive}) => cs(styles.button, {[styles.selected]: isActive})} to={to}>
            {icon} <span className={styles.text}>{name}</span>
        </NavLink>
    );
}