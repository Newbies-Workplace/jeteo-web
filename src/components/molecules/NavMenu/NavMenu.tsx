import React from 'react';

import styles from './NavMenu.module.scss';
import {useAuth} from "../../../contexts/auth/hooks/useAuth.hook";
import {NavMenuItemLink} from "./NavMenuItem/NavMenuItemLink";
import {NavMenuItemButton} from "./NavMenuItem/NavMenuItemButton";

export const NavMenu: React.FC = () => {
    const {user, logout} = useAuth();

    return (
        <div className={styles.container}>

            {user &&
                <div className={styles.userInfo}>
                    <h3 className={styles.username}>{user?.nickname}</h3>
                    <p className={styles.role}>Użytkownik</p>
                </div>
            }

            <div className={styles.innerContainer}>

                {user &&
                    <>
                        <NavMenuItemLink
                            location="/studio/events">
                            jeteo™ studio
                        </NavMenuItemLink>
                        <NavMenuItemLink
                            location="/settings/personalization">
                            ustawienia
                        </NavMenuItemLink>
                        <hr className={styles.separator}/>
                    </>
                }

                {user ? 
                    <NavMenuItemButton 
                        onClick={logout}>
                        wyloguj
                    </NavMenuItemButton>
                    :
                    <NavMenuItemLink
                        location={'/auth/signin'}>
                        zaloguj
                    </NavMenuItemLink>
                }
            </div>
        </div>
    );
}