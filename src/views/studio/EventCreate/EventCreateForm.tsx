import React, {useState} from "react";
import styles from "./EventCreateForm.module.scss";
import {StudioToolbar} from "../StudioToolbar/StudioToolbar";
import {useNavigate} from "react-router-dom";
import {StepView} from "../../../components/ui/StepView/StepView";
import {EventBasicInfoForm} from "../../../components/containers/EventForm/BasicInfo/EventBasicInfoForm";
import {EventVisibilityForm} from "../../../components/containers/EventForm/Visibility/EventVisibilityForm";
import {EventThemeForm} from "../../../components/containers/EventForm/Theme/EventThemeForm";
import {EventLecturesForm} from "../../../components/containers/EventForm/Lectures/EventLecturesForm";
import {EventData} from "../../../api/graphql/events/EventDataQuery";

const steps = [
    "Podstawowe informacje",
    "Wygląd",
    "Prelekcje",
    "Publikacja",
]

export const EventCreateForm: React.FC = () => {
    const navigate = useNavigate()
    const [activeStepIndex, setActiveStepIndex] = useState(0)
    const [event, setEvent] = useState<EventData | null>(null)

    return (
        <div className={styles.container}>
            <StudioToolbar
                title={"Tworzenie wydarzenia"}
                onBackPress={() => {navigate(-1)}}/>

            <StepView
                steps={steps}
                activeStepIndex={activeStepIndex}/>

            <div className={styles.innerContainer}>
                {displayCurrentStep(
                    activeStepIndex,
                    (index: number) => setActiveStepIndex(index),
                    event,
                    (event: EventData) => setEvent(event),
                    () => navigate(-1),
                )}
            </div>
        </div>
    )
}

const displayCurrentStep = (
    index: number,
    setIndex: (index: number) => void,
    event: EventData | null,
    setEvent: (event: EventData) => void,
    navigateUp: () => void,
) => {
    if (event && index === 1) {
        return <EventThemeForm
            event={event}
            onSubmitted={() => setIndex(2)}/>
    } else if (event && index === 2) {
        return <EventLecturesForm
            event={event}
            onSubmitted={() => setIndex(3)}/>
    } else if (event && index === 3) {
        return <EventVisibilityForm
            event={event}
            onSubmitted={() => navigateUp()}/>
    } else {
        return <EventBasicInfoForm
            event={null}
            onSubmitted={(createdEvent) => {
                setEvent(createdEvent)
                setIndex(1)
            }}/>
    }
}