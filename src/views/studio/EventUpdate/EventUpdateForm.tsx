import React, {useState} from "react";
import styles from "./EventUpdateForm.module.scss";
import {Toolbar} from "../Toolbar/Toolbar";
import {useNavigate, useParams} from "react-router-dom";
import {ClickableStepView} from "../../../components/ui/StepView/StepView";
import {EventBasicInfoForm} from "../../../components/containers/EventForm/BasicInfo/EventBasicInfoForm";
import {EventVisibilityForm} from "../../../components/containers/EventForm/Visibility/EventVisibilityForm";
import {EventThemeForm} from "../../../components/containers/EventForm/Theme/EventThemeForm";
import {EventLecturesForm} from "../../../components/containers/EventForm/Lectures/EventLecturesForm";
import {EventQueryData, EventQueryVars, GET_EVENT_QUERY} from "../../../api/graphql/events/EventDataQuery";
import {useQuery} from "@apollo/client";
import {getIdFromVanityUrl} from "../../../common/utils/vanityUrlUtils";
import {Event} from "../../../common/models/Event";

const steps = [
    "Podstawowe informacje",
    "Wygląd",
    "Prelekcje",
    "Publikacja",
]

export const EventUpdateForm: React.FC = () => {
    const navigate = useNavigate()
    const [activeStepIndex, setActiveStepIndex] = useState(0)
    const [event, setEvent] = useState<Event | undefined>(undefined)
    const {name} = useParams<{name: string}>()

    const {loading, error} = useQuery<EventQueryData, EventQueryVars>(
        GET_EVENT_QUERY, {
            variables: {
                id: getIdFromVanityUrl(name)
            },
            onCompleted: (data) => {
                setEvent(Event.fromData(data.event))
            }
        }
    )

    if (loading || !event) return <>loading...</>;
    if (error) return <p>error <br/>{error.message}</p>;

    return (
        <div className={styles.container}>
            <Toolbar
                title={"Edycja wydarzenia"}
                onBackPress={() => {navigate(-1)}}/>

            <ClickableStepView
                steps={steps}
                activeStepIndex={activeStepIndex}
                onStepClicked={(index) => {setActiveStepIndex(index)}}/>

            <div className={styles.innerContainer}>
                {displayCurrentStep(
                    activeStepIndex,
                    (index: number) => setActiveStepIndex(index),
                    event,
                    () => {},
                )}
            </div>
        </div>
    )
}

const displayCurrentStep = (
    index: number,
    setIndex: (index: number) => void,
    event: Event,
    setEvent: (event: Event) => void,
) => {
    switch (index) {
        default:
        case 0:
            return <EventBasicInfoForm
                event={event}
                onSubmitted={(event) => {
                    setEvent(event)
                }}/>
        case 1:
            return <EventThemeForm
                event={event}
                onSubmitted={(event) => {
                    setEvent(event)
                }}/>
        case 2:
            return <EventLecturesForm
                event={event}
                onSubmitted={(event) => {
                    setEvent(event)
                }}/>
        case 3:
            return <EventVisibilityForm
                event={event}
                onSubmitted={(event) => {
                    setEvent(event)
                }}/>
    }
}