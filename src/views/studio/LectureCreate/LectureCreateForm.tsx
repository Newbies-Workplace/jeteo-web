import React from "react";
import studioFormStyles from "../../../common/styles/StudioFormStyles.module.scss";
import {Toolbar} from "../Toolbar/Toolbar";
import {useNavigate, useParams} from "react-router-dom";
import {LectureBasicInfoForm} from "../../../components/form/LectureForm/BasicInfo/LectureBasicInfoForm";
import {getIdFromVanityUrl} from "../../../common/utils/vanityUrlUtils";

export const LectureCreateForm: React.FC = () => {
    const navigate = useNavigate()
    const {name} = useParams<{name: string}>()

    return (
        <div className={studioFormStyles.container}>
            <Toolbar
                title={"Tworzenie prelekcji"}
                onBackPress={() => {navigate(`/studio/events/${name}/edit`)}}/>

            <div className={studioFormStyles.innerContainer}>
                <LectureBasicInfoForm
                    eventId={getIdFromVanityUrl(name)}
                    onSubmitted={() => navigate(`/studio/events/${name}/edit`)}/>
            </div>
        </div>
    )
}