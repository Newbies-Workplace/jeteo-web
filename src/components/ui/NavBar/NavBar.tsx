import React, {useState} from 'react';

import styles from './NavBar.module.css';
import {AppLogo} from "../AppLogo/AppLogo";
import {Link} from "react-router-dom";
import {MenuBase} from "../../utils/MenuBase/MenuBase";
import {NavMenu} from "../NavMenu/NavMenu";

import Burger from '/assets/images/icons/burger.svg';

export const NavBar: React.FC = () => {

    const [open, setOpen] = useState(false);

    return (
        <div className={styles.container}>
            <Link to={'/'}>
                <AppLogo/>
            </Link>

            <span>
                <button
                    className={styles.burgerButton}
                    onClick={() => setOpen(prev => !prev)}>
                    <Burger/>
                </button>
                <MenuBase
                    position="left"
                    isOpen={open}
                    setOpen={setOpen}>
                    <NavMenu/>
                </MenuBase>
            </span>
        </div>
    );
};