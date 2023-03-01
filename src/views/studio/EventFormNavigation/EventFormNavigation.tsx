import React from "react";
import studioFormStyles from "../../../common/styles/StudioFormStyles.module.scss";
import {Toolbar} from "../Toolbar/Toolbar";
import {ClickableStepView, StepView} from "../../../components/ui/StepView/StepView";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router";

const steps = [
    {name: "Podstawowe informacje", path: 'basic'},
    {name: "Wygląd", path: 'theme'},
    {name: "Prelekcje", path: 'lectures'},
    {name: "Publikacja", path: 'visibility'},
]

interface EventNavigationProps {
    toolbarTitle: string
    clickable?: boolean
}

export const EventFormNavigation: React.FC<React.PropsWithChildren<EventNavigationProps>> = (
    {
        children,
        toolbarTitle,
        clickable = false,
    }
) => {
    const navigate = useNavigate()
    const { pathname } = useLocation();
    const path = pathname.split('/').at(-1)
    const currentStep =
        path === 'create'
            ? 0
            : steps.findIndex(step => step.path === path)

    return (
        <div className={studioFormStyles.container}>
            {/*todo handle back in edit*/}
            <Toolbar
                title={toolbarTitle}
                onBackPress={() => {navigate('/studio/events')}}/>

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