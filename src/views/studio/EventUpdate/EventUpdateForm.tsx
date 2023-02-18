import React, {useState} from "react";
import studioFormStyles from "./../../../common/styles/StudioFormStyles.module.scss";
import {Toolbar} from "../Toolbar/Toolbar";
import {useNavigate, useParams} from "react-router-dom";
import {ClickableStepView} from "../../../components/ui/StepView/StepView";
import {EventBasicInfoForm} from "../../../components/form/EventForm/BasicInfo/EventBasicInfoForm";
import {EventVisibilityForm} from "../../../components/form/EventForm/Visibility/EventVisibilityForm";
import {EventThemeForm} from "../../../components/form/EventForm/Theme/EventThemeForm";
import {EventLecturesForm} from "../../../components/form/EventForm/Lectures/EventLecturesForm";
import {getIdFromVanityUrl} from "../../../common/utils/vanityUrlUtils";
import {Event} from "../../../common/models/Event";
import {useEventQuery} from "../../../api/graphql";

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
        <div className={studioFormStyles.container}>
            <Toolbar
                title={"Edycja wydarzenia"}
                onBackPress={() => {navigate(`/studio/events/${name}`)}}/>

            <ClickableStepView
                steps={steps}
                activeStepIndex={activeStepIndex}
                onStepClicked={(index) => {setActiveStepIndex(index)}}/>

            <div className={studioFormStyles.innerContainer}>
                {displayCurrentStep(
                    activeStepIndex,
                    (index: number) => setActiveStepIndex(index),
                    event,
                    (event) => setEvent(event),
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
                onEventChange={(event) => {
                    setEvent(event)
                }}
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