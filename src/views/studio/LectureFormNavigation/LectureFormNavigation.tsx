import React, {useState} from "react";
import studioFormStyles from "../../../common/styles/StudioFormStyles.module.scss";
import {Toolbar} from "../../../components/ui/Toolbar/Toolbar";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {ClickableStepView, StepView} from "../../../components/ui/StepView/StepView";
import {Navigate, useLocation} from "react-router";
import {LectureBasicInfoForm} from "./BasicInfo/LectureBasicInfoForm";
import {LectureSpeakersForm} from "./Speakers/LectureSpeakersForm";
import {getIdFromVanityUrl} from "../../../common/utils/vanityUrlUtils";
import {CoreLectureResponseFragment, useLectureQuery} from "../../../api/graphql";

const steps = [
    {name: "Podstawowe informacje", path: 'basic'},
    {name: "Prelegenci", path: 'speakers'},
]

export const LectureFormNavigation: React.FC = () => {
    const navigate = useNavigate()
    const [lecture, setLecture] = useState<CoreLectureResponseFragment>()
    const {operation, lectureOperation, lectureId, name} = useParams<{
        operation?: 'create' | 'edit'
        lectureOperation?: 'create' | 'edit'
        lectureId?: string
        name: string
    }>()

    const eventId = getIdFromVanityUrl(name)
    const { pathname } = useLocation();
    const path = pathname.split('/').at(-1)
    const currentStep =
        (lectureOperation ?? 'create') === 'create'
            ? 0
            : steps.findIndex(step => step.path === path)

    const {loading, error} = useLectureQuery({
        variables: {
            id: lectureId!,
        },
        skip: !lectureId,
        onCompleted: (data) => {
            setLecture(data.lecture)
        }
    })

    if (lectureId && (loading || !lecture)) return <>loading...</>;
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
                    {lectureOperation !== 'edit' &&
                        <Route element={<Navigate to={'basic'}/>} path={'/'}/>
                    }

                    <Route
                        element={
                            <LectureBasicInfoForm
                                eventId={eventId}
                                lecture={lecture}
                                onSubmitted={(lecture) => {
                                    setLecture(lecture)

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