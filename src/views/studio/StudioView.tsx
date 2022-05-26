import React from 'react';
import {NavBar} from "../../components/ui/NavBar/NavBar";
import styles from './StudioView.module.scss';
import {Route, Routes} from "react-router-dom";
import {StudioDashboard} from "./StudioDashboard/StudioDashboard";
import {RequireAuth} from "../../components/utils/requireAuth/RequireAuth";
import {StudioNav} from "./StudioNav/StudioNav";
import {StudioEventList} from "./StudioEventList/StudioEventList";
import {StudioEventDetails} from "./StudioEventDetails/StudioEventDetails";

export const StudioView: React.FC = () => {
    return (
        <RequireAuth>
            <div className={styles.container}>
                <NavBar withBackground/>
                <div className={styles.pageContainer}>
                    <StudioNav/>

                    <div className={styles.separator}/>

                    <div className={styles.content}>
                        <Routes>
                            <Route
                                element={<StudioDashboard/>}
                                path="*"/>
                            <Route
                                element={<StudioEventList/>}
                                path="/events"/>
                            <Route
                                element={<p>ekran tworzenia eventu</p>}
                                path="/events/create"/>
                            <Route
                                element={<StudioEventDetails/>}
                                path="/events/:name"/>
                            <Route
                                element={<p>ekran edycji eventu</p>}
                                path="/events/:name/edit"/>
                        </Routes>
                    </div>
                </div>
            </div>
        </RequireAuth>
    );
};
