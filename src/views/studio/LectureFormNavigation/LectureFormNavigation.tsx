import React from "react";
import studioFormStyles from "../../../common/styles/StudioFormStyles.module.scss";
import {Toolbar} from "../Toolbar/Toolbar";
import {useNavigate, useParams} from "react-router-dom";

interface LectureFormNavigationProps {
    toolbarTitle: string
}

export const LectureFormNavigation: React.FC<React.PropsWithChildren<LectureFormNavigationProps>> = ({children, toolbarTitle}) => {
    const navigate = useNavigate()
    const {name} = useParams<{name: string}>()


    return (
        <div className={studioFormStyles.container}>
            <Toolbar
                title={toolbarTitle}
                onBackPress={() => {navigate(`/studio/events/edit/${name}/lectures`)}}/>

            <div className={studioFormStyles.innerContainer}>
                {children}
            </div>
        </div>
    )
}