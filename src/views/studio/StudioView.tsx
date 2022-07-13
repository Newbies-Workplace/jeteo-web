import React from 'react';
import {NavBar} from "../../components/ui/NavBar/NavBar";
import styles from './StudioView.module.scss';
import {Route, Routes} from "react-router-dom";
import {StudioDashboard} from "./StudioDashboard/StudioDashboard";
import {RequireAuth} from "../../components/utils/requireAuth/RequireAuth";
import {StudioNav} from "./StudioNav/StudioNav";
import {StudioEventList} from "./StudioEventList/StudioEventList";
import {StudioEventDetails} from "./StudioEventDetails/StudioEventDetails";
import {EventCreateForm} from "./EventCreate/EventCreateForm";
import {EventUpdateForm} from "./EventUpdate/EventUpdateForm";

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
                                element={<EventCreateForm/>}
                                path="/events/create"/>
                            <Route
                                element={<StudioEventDetails/>}
                                path="/events/:name"/>
                            <Route
                                element={<EventUpdateForm/>}
                                path="/events/:name/edit"/>
                        </Routes>
                    </div>
                </div>
            </div>
        </RequireAuth>
    );
};
