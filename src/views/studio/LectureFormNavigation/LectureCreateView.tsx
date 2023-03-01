import React, {useState} from "react";
import {Route, Routes, useParams} from "react-router-dom";
import {getIdFromVanityUrl} from "../../../common/utils/vanityUrlUtils";
import {LectureSpeakersForm} from "./Speakers/LectureSpeakersForm";
import {CoreLectureResponseFragment, useLectureQuery} from "../../../api/graphql";

export const LectureCreateView: React.FC = () => {
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
                    <LectureSpeakersForm
                        eventId={getIdFromVanityUrl(name)}
                        lecture={lecture}
                        onLectureChange={setLecture}/>
                }
                path={"/speakers"} />
        </Routes>
    )
}