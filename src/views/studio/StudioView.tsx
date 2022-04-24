import React from 'react';
import {NavBar} from "../../components/ui/NavBar/NavBar";
import styles from './StudioView.module.scss';
import {Route, Routes} from "react-router-dom";
import {StudioEvents} from "./StudioEvents/StudioEvents";
import {StudioDashboard} from "./StudioDashboard/StudioDashboard";
import {RequireAuth} from "../../components/utils/requireAuth/RequireAuth";
import {StudioNav} from "./StudioNav/StudioNav";

export const StudioView: React.FC = () => {

    return (
        <RequireAuth>
            <div className={styles.container}>
                <NavBar withBackground/>
                <div className={styles.pageContainer}>
                    <StudioNav/>

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
