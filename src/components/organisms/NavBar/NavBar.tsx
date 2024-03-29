import React, {useState} from 'react';

import styles from './NavBar.module.scss';
import {AppLogo} from "../../atoms/AppLogo/AppLogo";
import {Link} from "react-router-dom";
import {MenuBase} from "../../atoms/MenuBase/MenuBase";
import {NavMenu} from "../../molecules/NavMenu/NavMenu";

import Burger from '../../../assets/icons/burger.svg';
import cs from "classnames";

interface NavBarProps {
    invertColor?: boolean
    withBackground?: boolean
}

export const NavBar: React.FC<NavBarProps> = ({ invertColor, withBackground = false }) => {

    const [open, setOpen] = useState(false);

    return (
        <div className={cs({[styles.background]: withBackground})}>
            <div className={cs(styles.container, {[styles.invert]: invertColor})}>
                <Link to={'/'}>
                    <AppLogo invert={invertColor}/>
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
        </div>
    );
};