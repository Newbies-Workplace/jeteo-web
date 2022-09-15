import React from 'react';
import {NavBar} from "../../components/ui/NavBar/NavBar";
import styles from './StudioView.module.scss';
import {Route, Routes} from "react-router-dom";
import {Dashboard} from "./Dashboard/Dashboard";
import {RequireAuth} from "../../components/utils/requireAuth/RequireAuth";
import {Navigation} from "./Navigation/Navigation";
import {EventList} from "./EventList/EventList";
import {EventCreateForm} from "./EventCreate/EventCreateForm";
import {EventUpdateForm} from "./EventUpdate/EventUpdateForm";
import {EventDetails} from "./EventDetails/EventDetails";
import {LectureCreateForm} from "./LectureCreate/LectureCreateForm";
import {LectureUpdateForm} from "./LectureUpdate/LectureUpdateForm";

export const StudioView: React.FC = () => {
    return (
        <RequireAuth>
            <div className={styles.container}>
                <NavBar withBackground/>
                <div className={styles.pageContainer}>
                    <Navigation/>

                    <div className={styles.separator}/>

                    <div className={styles.content}>
                        <Routes>
                            <Route
                                element={<EventList/>}
                                path="/events"/>
                            <Route
                                element={<EventCreateForm/>}
                                path="/events/create"/>
                            <Route
                                element={<LectureCreateForm/>}
                                path="/events/:name/lectures/create"/>
                            <Route
                                element={<LectureUpdateForm/>}
                                path="/events/:name/lectures/:lectureId/edit"/>
                            <Route
                                element={<EventUpdateForm/>}
                                path="/events/:name/edit"/>
                            <Route
                                element={<EventDetails/>}
                                path="/events/:name"/>
                            <Route
                                element={<Dashboard/>}
                                path="*"/>
                        </Routes>
                    </div>
                </div>
            </div>
        </RequireAuth>
    );
};
