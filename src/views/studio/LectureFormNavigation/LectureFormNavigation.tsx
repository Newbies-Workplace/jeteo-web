import React from "react";
import studioFormStyles from "../../../common/styles/StudioFormStyles.module.scss";
import {Toolbar} from "../Toolbar/Toolbar";
import {useNavigate, useParams} from "react-router-dom";
import {ClickableStepView, StepView} from "../../../components/ui/StepView/StepView";
import {useLocation} from "react-router";

const steps = [
    {name: "Podstawowe informacje", path: 'basic'},
    {name: "Prelegenci", path: 'speakers'},
]

interface LectureFormNavigationProps {
    toolbarTitle: string
    clickable?: boolean
}

export const LectureFormNavigation: React.FC<React.PropsWithChildren<LectureFormNavigationProps>> = ({children, toolbarTitle, clickable}) => {
    const navigate = useNavigate()
    const {name} = useParams<{name: string}>()

    const { pathname } = useLocation();
    const path = pathname.split('/').at(-1)
    const currentStep =
        path === 'create'
            ? 0
            : steps.findIndex(step => step.path === path)

    return (
        <div className={studioFormStyles.container}>
            <Toolbar
                title={toolbarTitle}
                onBackPress={() => {navigate(`/studio/events/edit/${name}/lectures`)}}/>

            {clickable
                ? <ClickableStepView
                    steps={steps.map(step => step.name)}
                    activeStepIndex={currentStep}
                    onStepClicked={(index) => {navigate(steps[index].path)}}/>
                : <StepView
                    steps={steps.map(step => step.name)}
                    activeStepIndex={currentStep}/>
            }

            <div className={studioFormStyles.innerContainer}>
                {children}
            </div>
        </div>
    )
}