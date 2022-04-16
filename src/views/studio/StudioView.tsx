import React from 'react';
import {NavBar} from "../../components/ui/NavBar/NavBar";
import Calendar from "../../assets/images/icons/calendar.svg"
import Dashboard from "../../assets/images/icons/dashboard.svg"
import styles from './StudioView.module.scss';
import {StudioNavButton} from "./StudioNavButton/StudioNavButton";
import {Route, Routes} from "react-router-dom";
import {StudioEvents} from "./StudioEvents/StudioEvents";
import {StudioDashboard} from "./StudioDashboard/StudioDashboard";
import {RequireAuth} from "../../components/utils/requireAuth/RequireAuth";

export const StudioView: React.FC = () => {

    return (
        <RequireAuth>
            <div className={styles.container}>
                <NavBar withBackground/>
                <div className={styles.pageContainer}>
                    <div className={styles.navigation}>
                        <h1 className={styles.logo}>STUDIO</h1>

                        <StudioNavButton
                            icon={<Dashboard width={20}/>}
                            name={"Dashboard"}
                            to={"dashboard"}/>

                        <StudioNavButton
                            icon={<Calendar width={20}/>}
                            name={"Wydarzenia"}
                            to={"events"}/>
                    </div>

                    <div className={styles.separator}/>

                    <Routes>
                        <Route
                            element={<StudioDashboard/>}
                            path="*"/>
                        <Route
                            element={<StudioEvents/>}
                            path="/events"/>
                    </Routes>
                </div>
            </div>
        </RequireAuth>
    );
};
