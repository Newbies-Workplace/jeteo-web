import React, {useState} from "react";
import studioFormStyles from "./../../../common/styles/StudioFormStyles.module.scss";
import {Toolbar} from "../Toolbar/Toolbar";
import {useNavigate} from "react-router-dom";
import {StepView} from "../../../components/ui/StepView/StepView";
import {EventBasicInfoForm} from "../../../components/form/EventForm/BasicInfo/EventBasicInfoForm";
import {EventVisibilityForm} from "../../../components/form/EventForm/Visibility/EventVisibilityForm";
import {EventThemeForm} from "../../../components/form/EventForm/Theme/EventThemeForm";
import {EventLecturesForm} from "../../../components/form/EventForm/Lectures/EventLecturesForm";
import {Event} from "../../../common/models/Event";

const steps = [
    "Podstawowe informacje",
    "Wygląd",
    "Prelekcje",
    "Publikacja",
]

export const EventCreateForm: React.FC = () => {
    const navigate = useNavigate()
    const [activeStepIndex, setActiveStepIndex] = useState(0)
    const [event, setEvent] = useState<Event | null>(null)

    return (
        <div className={studioFormStyles.container}>
            <Toolbar
                title={"Tworzenie wydarzenia"}
                onBackPress={() => {navigate('/studio/events')}}/>

            <StepView
                steps={steps}
                activeStepIndex={activeStepIndex}/>

            <div className={studioFormStyles.innerContainer}>
                {displayCurrentStep(
                    activeStepIndex,
                    (index: number) => setActiveStepIndex(index),
                    event,
                    (event: Event) => setEvent(event),
                    () => navigate(-1),
                )}
            </div>
        </div>
    )
}

const displayCurrentStep = (
    index: number,
    setIndex: (index: number) => void,
    event: Event | null,
    setEvent: (event: Event) => void,
    navigateUp: () => void,
) => {
    switch (index) {
        default:
        case 0:
            return <EventBasicInfoForm
                onSubmitted={(createdEvent) => {
                    setEvent(createdEvent)
                    setIndex(1)
                }} />
        case 1:
            return <EventThemeForm
                event={event!}
                onEventChange={(event) => {
                    setEvent(event)
                }}
                onSubmitted={(event) => {
                    setEvent(event)
                    setIndex(2)
                }}/>
        case 2:
            return <EventLecturesForm
                event={event!}
                onSubmitted={(event) => {
                    setEvent(event)
                    setIndex(3)
                }}/>
        case 3:
            return <EventVisibilityForm
                event={event!}
                onSubmitted={(event) => {
                    setEvent(event)
                    navigateUp()
                }}/>
    }
}