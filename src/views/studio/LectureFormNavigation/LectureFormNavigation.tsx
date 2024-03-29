import React, {useState} from "react";
import studioFormStyles from "../../../common/styles/StudioFormStyles.module.scss";
import {Toolbar} from "../../../components/atoms/Toolbar/Toolbar";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {ClickableStepView, StepView} from "../../../components/molecules/StepView/StepView";
import {useLocation} from "react-router";
import {LectureBasicInfoForm} from "./BasicInfo/LectureBasicInfoForm";
import {LectureSpeakersForm} from "./Speakers/LectureSpeakersForm";
import {getIdFromVanityUrl} from "../../../common/utils/vanityUrlUtils";
import {CoreLectureResponseFragment, InviteLectureResponseFragment, useLectureQuery} from "../../../api/graphql";

const steps = [
    {name: "Podstawowe informacje", path: 'basic'},
    {name: "Prelegenci", path: 'speakers'},
]

export const LectureFormNavigation: React.FC = () => {
    const navigate = useNavigate()
    const [lecture, setLecture] = useState<CoreLectureResponseFragment & InviteLectureResponseFragment>()
    const {operation, lectureOperation, lectureId, name} = useParams<{
        operation?: 'create' | 'edit'
        lectureOperation?: 'create' | 'edit'
        lectureId?: string
        name: string
    }>()

    const eventId = getIdFromVanityUrl(name)
    const { pathname } = useLocation();
    const path = pathname.split('/').at(-1)
    const currentStep = steps.findIndex(step => step.path === path)
    const loadLecture = lectureId && !steps.map(step => step.path).includes(lectureId)

    const {loading, error} = useLectureQuery({
        variables: {
            id: lectureId!,
        },
        skip: !loadLecture,
        onCompleted: (data) => {
            setLecture(data.lecture)
        }
    })

    if (loadLecture && (loading || !lecture)) return <>loading...</>;
    if (error) return <p>error <br/>{error.message}</p>;

    return (
        <div className={studioFormStyles.container}>
            <Toolbar
                title={lectureOperation === 'edit' ? 'Edycja prelekcji' : 'Tworzenie prelekcji'}
                onBackPress={() => {
                    navigate(`/studio/events/${operation}/${name}/lectures`)
                }}/>

            {lectureOperation === 'edit'
                ? <ClickableStepView
                    steps={steps.map(step => step.name)}
                    activeStepIndex={currentStep}
                    onStepClicked={(index) => {navigate(steps[index].path)}}/>
                : <StepView
                    steps={steps.map(step => step.name)}
                    activeStepIndex={currentStep}/>
            }

            <div className={studioFormStyles.innerContainer}>
                <Routes>
                    <Route
                        element={
                            <LectureBasicInfoForm
                                eventId={eventId}
                                lecture={lecture}
                                onSubmitted={(submittedLecture) => {
                                    setLecture({...submittedLecture, invites: lecture?.invites!})

                                    if (lectureOperation !== 'edit') {
                                        navigate(`/studio/events/${operation}/${name}/lectures/${lectureOperation}/${lectureId}/speakers`)
                                    }
                                }}/>
                        }
                        path={'/'}/>
                    <Route
                        element={
                            <LectureBasicInfoForm
                                eventId={eventId}
                                lecture={lecture}
                                onSubmitted={(submittedLecture) => {
                                    setLecture({...submittedLecture, invites: lecture?.invites!})

                                    if (lectureOperation !== 'edit') {
                                        navigate(`speakers`)
                                    }
                                }}/>
                        }
                        path={'/basic'}/>

                    <Route
                        element={
                            <LectureSpeakersForm
                                lecture={lecture!}
                                onLectureChange={setLecture}
                                onSubmitted={(lecture) => {
                                    setLecture(lecture)

                                    navigate(`/studio/events/${operation}/${name}/lectures`)
                                }}/>
                        }
                        path={'/speakers'}/>
                </Routes>
            </div>
        </div>
    )
}