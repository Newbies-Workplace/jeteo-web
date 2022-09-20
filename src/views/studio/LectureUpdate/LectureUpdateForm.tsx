import React, {useState} from "react";
import studioFormStyles from "../../../common/styles/StudioFormStyles.module.scss";
import {Toolbar} from "../Toolbar/Toolbar";
import {useNavigate, useParams} from "react-router-dom";
import {LectureBasicInfoForm} from "../../../components/form/LectureForm/BasicInfo/LectureBasicInfoForm";
import {getIdFromVanityUrl} from "../../../common/utils/vanityUrlUtils";
import {useLectureQuery} from "../../../api/graphql";
import {Lecture} from "../../../common/models/Lecture";

export const LectureUpdateForm: React.FC = () => {
    const navigate = useNavigate()
    const {name, lectureId} = useParams<{name: string, lectureId: string}>()
    const [lecture, setLecture] = useState<Lecture>()
    const {loading, error} = useLectureQuery({
        variables: {
            id: lectureId!,
        },
        onCompleted: (data) => {
            setLecture(Lecture.fromData(data.lecture))
        }
    })

    if (loading || !lecture) return <>loading...</>;
    if (error) return <p>error <br/>{error.message}</p>;

    return (
        <div className={studioFormStyles.container}>
            <Toolbar
                title={"Edycja prelekcji"}
                onBackPress={() => {navigate(`/studio/events/${name}/edit`)}}/>

            <div className={studioFormStyles.innerContainer}>
                <LectureBasicInfoForm
                    eventId={getIdFromVanityUrl(name)}
                    lecture={lecture}
                    onSubmitted={() => navigate(`/studio/events/${name}/edit`)}/>
            </div>
        </div>
    )
}