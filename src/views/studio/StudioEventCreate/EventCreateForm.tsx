import React, {useState} from "react";
import styles from "./StudioEventCreate.module.scss";
import {StudioToolbar} from "../StudioToolbar/StudioToolbar";
import {useNavigate} from "react-router-dom";
import {StepView} from "../../../components/ui/StepView/StepView";
import {EventBasicInfoForm} from "./BasicInfo/EventBasicInfoForm";
import {EventVisibilityForm} from "./Visibility/EventVisibilityForm";
import {EventThemeForm} from "./Theme/EventThemeForm";
import {EventLecturesForm} from "./Lectures/EventLecturesForm";

const steps = [
    "Podstawowe informacje",
    "Wygląd",
    "Prelekcje",
    "Publikacja",
]

export const EventCreateForm: React.FC = () => {
    const navigate = useNavigate()
    const [activeStepIndex, setActiveStepIndex] = useState(0)
    const [eventId, setEventId] = useState<string | null>(null)

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
                    eventId,
                    (id: string) => setEventId(id),
                    () => navigate(-1),
                )}
            </div>
        </div>
    )
}

const displayCurrentStep = (
    index: number,
    setIndex: (index: number) => void,
    eventId: string | null,
    setEventId: (id: string) => void,
    navigateUp: () => void,
) => {
    switch (index) {
        default:
        case 0:
            return <EventBasicInfoForm onSubmitted={(createdId) => {
                setEventId(createdId)
                setIndex(1)
            }}/>
        case 1:
            return <EventThemeForm eventId={eventId ?? ''} onSubmitted={() => setIndex(2)}/>
        case 2:
            return <EventLecturesForm eventId={eventId ?? ''} onSubmitted={() => setIndex(3)}/>
        case 3:
            return <EventVisibilityForm eventId={eventId ?? ''} onSubmitted={() => navigateUp()}/>
    }
}