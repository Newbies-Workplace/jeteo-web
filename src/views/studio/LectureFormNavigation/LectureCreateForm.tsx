import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {LectureBasicInfoForm} from "../../../components/form/LectureForm/BasicInfo/LectureBasicInfoForm";
import {getIdFromVanityUrl} from "../../../common/utils/vanityUrlUtils";

export const LectureCreateForm: React.FC = () => {
    const navigate = useNavigate()
    const {name} = useParams<{name: string}>()

    return (
        <LectureBasicInfoForm
            eventId={getIdFromVanityUrl(name)}
            onSubmitted={() => navigate(`/studio/events/edit/${name}`)}/>
    )
}