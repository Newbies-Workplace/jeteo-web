import React from 'react';
import { useAuth } from '../../contexts/auth/hooks/useAuth.hook';

import {EventList} from "../../components/ui/EventList/EventList";
import {NavBar} from "../../components/ui/NavBar/NavBar";

import styles from './HomeView.module.scss';

export const HomeView: React.FC = () => {

    const { user } = useAuth()

    return (
        <>
            <NavBar/>
            <div className={styles.view}>
                <h1>
                    {user ?
                        <>Witaj, <b>{user.nickname}!</b> 👋</>
                        : `Witaj, użytkowniku! 👋`}
                </h1>
                <div className={styles.list}>
                    <EventList/>
                </div>
            </div>
        </>
    );
};
