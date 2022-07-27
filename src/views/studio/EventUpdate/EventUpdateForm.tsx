import React, {useState} from "react";
import styles from "./EventUpdateForm.module.scss";
import {StudioToolbar} from "../StudioToolbar/StudioToolbar";
import {useNavigate, useParams} from "react-router-dom";
import {ClickableStepView} from "../../../components/ui/StepView/StepView";
import {EventBasicInfoForm} from "../../../components/containers/EventForm/BasicInfo/EventBasicInfoForm";
import {EventVisibilityForm} from "../../../components/containers/EventForm/Visibility/EventVisibilityForm";
import {EventThemeForm} from "../../../components/containers/EventForm/Theme/EventThemeForm";
import {EventLecturesForm} from "../../../components/containers/EventForm/Lectures/EventLecturesForm";
import {EventData, EventQueryData, EventQueryVars, GET_EVENT_QUERY} from "../../../api/graphql/events/EventDataQuery";
import {useQuery} from "@apollo/client";
import {getIdFromVanityUrl} from "../../../common/utils/vanityUrlUtils";

const steps = [
    "Podstawowe informacje",
    "Wygląd",
    "Prelekcje",
    "Publikacja",
]

export const EventUpdateForm: React.FC = () => {
    const navigate = useNavigate()
    const [activeStepIndex, setActiveStepIndex] = useState(0)
    const {name} = useParams<{name: string}>()

    const {loading, error, data} = useQuery<EventQueryData, EventQueryVars>(
        GET_EVENT_QUERY, {
            variables: {
                id: getIdFromVanityUrl(name)
            }
        }
    )

    if (loading || !data) return <>loading...</>;
    if (error) return <p>error <br/>{error.message}</p>;

    return (
        <div className={styles.container}>
            <StudioToolbar
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
                    data.event,
                    () => {},
                )}
            </div>
        </div>
    )
}

const displayCurrentStep = (
    index: number,
    setIndex: (index: number) => void,
    event: EventData,
    setEvent: (event: EventData) => void,
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