import React, {useState} from "react";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {EventVisibilityForm} from "./Visibility/EventVisibilityForm";
import {EventThemeForm} from "./Theme/EventThemeForm";
import {EventLecturesForm} from "./Lectures/EventLecturesForm";
import {Event} from "../../../common/models/Event";
import {useEventQuery} from "../../../api/graphql";
import {getIdFromVanityUrl} from "../../../common/utils/vanityUrlUtils";

export const EventCreateView: React.FC = () => {
    const navigate = useNavigate()
    const {name} = useParams<{name: string}>()
    const [event, setEvent] = useState<Event | null>(null)

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
                element={
                    <EventThemeForm
                        event={event}
                        onEventChange={(event) => {
                            setEvent(event)
                        }}
                        onSubmitted={(event) => {
                            setEvent(event)
                            navigate(`lectures`)
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
                            navigate(`visibility`)
                        }}/>
                }
                path={'/lectures'}/>
            <Route
                element={
                    <EventVisibilityForm
                        event={event}
                        onSubmitted={(event) => {
                            setEvent(event)
                            navigate('..')
                        }}/>
                }
                path={'/visibility'}/>
        </Routes>
    )
}