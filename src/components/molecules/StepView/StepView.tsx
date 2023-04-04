import styles from "./StepView.module.scss";
import cs from "classnames";
import React from "react";
import NextArrow from "../../../assets/icons/next-arrow.svg"

interface StepViewProps {
    steps: string[]
    activeStepIndex: number
}

interface ClickableStepViewProps {
    steps: string[]
    activeStepIndex: number
    onStepClicked: (index: number) => void
}

export const ClickableStepView: React.FC<ClickableStepViewProps> = ({steps, activeStepIndex, onStepClicked}) => (
    <div className={styles.clickableSteps}>
        {steps.map((step, i) =>
            <div key={i.toString()} onClick={() => onStepClicked(i)} className={styles.clickableStepContainer}>
                <Step
                    index={i + 1}
                    title={step}
                    isSelected={i === activeStepIndex}/>
            </div>
        )}
    </div>
)

export const StepView: React.FC<StepViewProps> = ({steps, activeStepIndex}) => (
    <div className={styles.steps}>
        {steps.map((step, i) => {
            const shouldPlaceArrow = i < steps.length - 1

            return <div key={i.toString()} className={styles.stepContainer}>
                <Step
                    index={i + 1}
                    title={step}
                    isSelected={i === activeStepIndex}/>

                {shouldPlaceArrow && <NextArrow width={24} height={24}/>}
            </div>
        })}
    </div>
)

interface StepProps {
    index: number
    title: string
    isSelected: boolean
}

const Step = ({index, title, isSelected}: StepProps) => (
    <div className={styles.step}>
        <span className={cs(styles.index, {[styles.indexActive]: isSelected})}>
            {index}
        </span>

        <span className={cs(styles.text, {[styles.textActive]: isSelected})}>
            {title}
        </span>
    </div>
)