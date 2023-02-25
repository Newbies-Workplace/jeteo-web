import React, {useState} from "react";
import {Route, Routes, useParams} from "react-router-dom";
import {EventBasicInfoForm} from "../../../components/form/EventForm/BasicInfo/EventBasicInfoForm";
import {EventVisibilityForm} from "../../../components/form/EventForm/Visibility/EventVisibilityForm";
import {EventThemeForm} from "../../../components/form/EventForm/Theme/EventThemeForm";
import {EventLecturesForm} from "../../../components/form/EventForm/Lectures/EventLecturesForm";
import {getIdFromVanityUrl} from "../../../common/utils/vanityUrlUtils";
import {Event} from "../../../common/models/Event";
import {useEventQuery} from "../../../api/graphql";
import {Navigate} from "react-router";

export const EventUpdateForm: React.FC = () => {
    const [event, setEvent] = useState<Event | undefined>(undefined)
    const {name} = useParams<{name: string}>()

    const {loading, error} = useEventQuery({
        variables: {
            id: getIdFromVanityUrl(name)
        },
        onCompleted: (data) => {
            setEvent(Event.fromData(data.event))
        }
    })

    if (loading || !event) return <>loading...</>;
    if (error) return <p>error <br/>{error.message}</p>;

    return (
        <Routes>
            <Route
                element={<Navigate to={'basic'} />}
                path={'/'}/>
            <Route
                element={
                    <EventBasicInfoForm
                        event={event}
                        onSubmitted={(createdEvent) => {
                            setEvent(createdEvent)
                        }} />
                }
                path={'/basic'}/>
            <Route
                element={
                    <EventThemeForm
                        event={event}
                        onEventChange={(event) => {
                            setEvent(event)
                        }}
                        onSubmitted={(event) => {
                            setEvent(event)
                        }}/>
                }
                path={'/theme'}/>
            <Route
                element={
                    <EventLecturesForm
                        event={event}
                        showNextButton={true}
                        onSubmitted={(event) => {
                            setEvent(event)
                        }}/>
                }
                path={'/lectures'}/>
            <Route
                element={
                    <EventVisibilityForm
                        event={event}
                        onSubmitted={(event) => {
                            setEvent(event)
                        }}/>
                }
                path={'/visibility'}/>
        </Routes>
    )
}