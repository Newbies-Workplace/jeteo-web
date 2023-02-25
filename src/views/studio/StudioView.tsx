import React from 'react';
import {NavBar} from "../../components/ui/NavBar/NavBar";
import styles from './StudioView.module.scss';
import {Route, Routes, useNavigate} from "react-router-dom";
import {RequireAuth} from "../../components/utils/requireAuth/RequireAuth";
import {Navigation} from "./Navigation/Navigation";
import {EventList} from "./EventList/EventList";
import {EventDetails} from "./EventDetails/EventDetails";
import {LectureCreateForm} from "./LectureFormNavigation/LectureCreateForm";
import {LectureUpdateForm} from "./LectureFormNavigation/LectureUpdateForm";
import {LectureStatsView} from "./LecutreStats/LectureStatsView";
import {EventCreateForm} from "./EventFormNavigation/EventCreateForm";
import {EventUpdateForm} from "./EventFormNavigation/EventUpdateForm";
import {EventBasicInfoForm} from "../../components/form/EventForm/BasicInfo/EventBasicInfoForm";
import {Navigate} from "react-router";
import {EventFormNavigation} from "./EventFormNavigation/EventFormNavigation";
import {LectureFormNavigation} from "./LectureFormNavigation/LectureFormNavigation";

export const StudioView: React.FC = () => {
    const navigate = useNavigate()

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
                                element={
                                    <EventFormNavigation toolbarTitle={"Tworzenie wydarzenia"}>
                                        <EventBasicInfoForm
                                            onSubmitted={(createdEvent) => {
                                                navigate(`events/create/${createdEvent.vanityUrl}/theme`)
                                            }} />
                                    </EventFormNavigation>
                                }
                                path={'/events/create'}/>
                            <Route
                                element={
                                    <EventFormNavigation toolbarTitle={"Tworzenie wydarzenia"}>
                                        <EventCreateForm/>
                                    </EventFormNavigation>
                                }
                                path="/events/create/:name/*"/>
                            <Route
                                element={
                                    <EventFormNavigation
                                        toolbarTitle={"Edycja wydarzenia"}
                                        clickable>
                                        <EventUpdateForm/>
                                    </EventFormNavigation>
                                }
                                path="/events/edit/:name/*"/>
                            <Route
                                element={
                                    <LectureFormNavigation toolbarTitle={"Tworzenie prelekcji"}>
                                        <LectureCreateForm/>
                                    </LectureFormNavigation>
                                }
                                path="/events/:name/lectures/create"/>
                            <Route
                                element={
                                    <LectureFormNavigation toolbarTitle={"Edycja prelekcji"}>
                                        <LectureUpdateForm/>
                                    </LectureFormNavigation>
                                }
                                path="/events/:name/lectures/edit/:lectureId"/>
                            <Route
                                element={<LectureStatsView/>}
                                path="/events/:name/lectures/:lectureId/*"/>
                            <Route
                                element={<EventDetails/>}
                                path="/events/:name"/>
                        </Routes>
                    </div>
                </div>
            </div>
        </RequireAuth>
    );
};

export default StudioView;