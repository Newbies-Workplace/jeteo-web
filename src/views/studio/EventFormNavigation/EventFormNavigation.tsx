import React, {useState} from "react";
import studioFormStyles from "../../../common/styles/StudioFormStyles.module.scss";
import {Toolbar} from "../../../components/ui/Toolbar/Toolbar";
import {ClickableStepView, StepView} from "../../../components/ui/StepView/StepView";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {Navigate, useLocation} from "react-router";
import {EventBasicInfoForm} from "./BasicInfo/EventBasicInfoForm";
import {EventThemeForm} from "./Theme/EventThemeForm";
import {EventLecturesForm} from "./Lectures/EventLecturesForm";
import {EventVisibilityForm} from "./Visibility/EventVisibilityForm";
import {Event} from "../../../common/models/Event";
import {useEventQuery} from "../../../api/graphql";
import {getIdFromVanityUrl} from "../../../common/utils/vanityUrlUtils";

const steps = [
    {name: "Podstawowe informacje", path: 'basic'},
    {name: "Wygląd", path: 'theme'},
    {name: "Prelekcje", path: 'lectures'},
    {name: "Publikacja", path: 'visibility'},
]

export const EventFormNavigation: React.FC = () => {
    const {operation, name} = useParams<{operation?: 'create' | 'edit', name?: string}>()
    const navigate = useNavigate()
    const { pathname } = useLocation();
    const path = pathname.split('/').at(-1)
    const currentStep =
        (operation ?? 'create') === 'create'
            ? 0
            : steps.findIndex(step => step.path === path)

    const [event, setEvent] = useState<Event | undefined>(undefined)

    const {loading, error} = useEventQuery({
        variables: {
            id: getIdFromVanityUrl(name)
        },
        skip: !name,
        onCompleted: (data) => {
            setEvent(Event.fromData(data.event))
        }
    })

    if (name && (loading || !event)) return <>loading...</>
    if (error) return <p>error <br/>{error.message}</p>

    return (
        <div className={studioFormStyles.container}>
            <Toolbar
                title={operation === 'edit' ? 'Edycja wydarzenia' : 'Tworzenie wydarzenia'}
                onBackPress={() => {
                    navigate(
                        (operation ?? 'create') === 'create'
                            ? '/studio/events'
                            : `/studio/events/${name}`
                    )}
                }/>

            {operation === 'edit'
                ? <ClickableStepView
                    steps={steps.map(step => step.name)}
                    activeStepIndex={currentStep}
                    onStepClicked={(index) => {
                        navigate(steps[index].path)
                    }}/>
                : <StepView
                    steps={steps.map(step => step.name)}
                    activeStepIndex={currentStep}/>
            }

            <div className={studioFormStyles.innerContainer}>
                <Routes>
                    {operation !== 'edit' &&
                        <Route element={<Navigate to={'basic'}/>} path={'/'}/>
                    }

                    <Route
                        element={
                            <EventBasicInfoForm
                                event={event}
                                onSubmitted={(createdEvent) => {
                                    setEvent(createdEvent)
                                    if (operation !== 'edit') {
                                        navigate('theme')
                                    }
                                }} />
                        }
                        path={'/basic'}/>
                    <Route
                        element={
                            <EventThemeForm
                                event={event!}
                                onEventChange={(event) => {
                                    setEvent(event)
                                }}
                                onSubmitted={(event) => {
                                    setEvent(event)
                                    if (operation !== 'edit') {
                                        navigate('lectures')
                                    }
                                }}/>
                        }
                        path={'/theme'}/>
                    <Route
                        element={
                            <EventLecturesForm
                                event={event!}
                                operation={operation!}
                                onSubmitted={(event) => {
                                    setEvent(event)
                                    if (operation !== 'edit') {
                                        navigate('visibility')
                                    }
                                }}/>
                        }
                        path={'/lectures'}/>
                    <Route
                        element={
                            <EventVisibilityForm
                                event={event!}
                                onSubmitted={(event) => {
                                    setEvent(event)

                                    if (operation !== 'edit') {
                                        navigate(`/studio/events/${event.vanityUrl}`)
                                    }
                                }}/>
                        }
                        path={'/visibility'}/>
                </Routes>
            </div>
        </div>
    )
}