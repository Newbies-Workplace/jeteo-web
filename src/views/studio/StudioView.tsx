import React from 'react';
import {NavBar} from "../../components/ui/NavBar/NavBar";
import styles from './StudioView.module.scss';
import {Route, Routes} from "react-router-dom";
import {RequireAuth} from "../../components/utils/requireAuth/RequireAuth";
import {Navigation} from "./Navigation/Navigation";
import {EventList} from "./EventList/EventList";
import {EventDetails} from "./EventDetails/EventDetails";
import {LectureStatsView} from "./LecutreStats/LectureStatsView";
import {Navigate} from "react-router";
import {EventFormNavigation} from "./EventFormNavigation/EventFormNavigation";
import {LectureFormNavigation} from "./LectureFormNavigation/LectureFormNavigation";

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
                                element={<Navigate to={'events'}/>}
                                path={"/"}/>
                            <Route
                                element={<EventList/>}
                                path="/events"/>
                            <Route
                                element={<EventDetails/>}
                                path="/events/:name"/>

                            <Route
                                element={<EventFormNavigation />}
                                path={'/events/:operation/:name?/*'}/>
                            <Route
                                element={<EventFormNavigation />}
                                path={'/events/create/*'}/>

                            <Route
                                element={<LectureFormNavigation />}
                                path={`/events/:operation/:name/lectures/:lectureOperation/:lectureId?/*`} />
                            <Route
                                element={<LectureFormNavigation />}
                                path={`/events/:operation/:name/lectures/create/*`} />

                            <Route
                                element={<LectureStatsView/>}
                                path="/events/:name/lectures/:lectureId/*"/>
                        </Routes>
                    </div>
                </div>
            </div>
        </RequireAuth>
    );
};

export default StudioView;