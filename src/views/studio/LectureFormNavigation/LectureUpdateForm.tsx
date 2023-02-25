import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {LectureBasicInfoForm} from "../../../components/form/LectureForm/BasicInfo/LectureBasicInfoForm";
import {getIdFromVanityUrl} from "../../../common/utils/vanityUrlUtils";
import {CoreLectureResponseFragment, useLectureQuery} from "../../../api/graphql";

export const LectureUpdateForm: React.FC = () => {
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
        <LectureBasicInfoForm
            eventId={getIdFromVanityUrl(name)}
            lecture={lecture}
            onSubmitted={() => navigate(`/studio/events/edit/${name}/lectures`)}/>
    )
}