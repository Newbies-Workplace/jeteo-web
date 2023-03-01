import React, {useState} from "react";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {LectureBasicInfoForm} from "./BasicInfo/LectureBasicInfoForm";
import {getIdFromVanityUrl} from "../../../common/utils/vanityUrlUtils";
import {CoreLectureResponseFragment, useLectureQuery} from "../../../api/graphql";
import {LectureSpeakersForm} from "./Speakers/LectureSpeakersForm";

export const LectureUpdateView: React.FC = () => {
    const navigate = useNavigate()
    const {name, lectureId} = useParams<{name: string, lectureId: string}>()
    const [lecture, setLecture] = useState<CoreLectureResponseFragment>()
    const {loading, error} = useLectureQuery({
        variables: {
            id: lectureId!,
        },
        onCompleted: (data) => {
            setLecture(data.lecture)
        }
    })

    if (loading || !lecture) return <>loading...</>;
    if (error) return <p>error <br/>{error.message}</p>;

    return (
        <Routes>
            <Route
                element={
                    <LectureBasicInfoForm
                        lecture={lecture}
                        onSubmitted={() => navigate(`/studio/events/edit/${name}/lectures`)}/>
                }
                path={'/basic'}/>

            <Route
                element={
                    <LectureSpeakersForm
                        eventId={getIdFromVanityUrl(name)}
                        lecture={lecture}
                        onLectureChange={setLecture}/>
                }
                path={'/speakers'}/>
        </Routes>
    )
}