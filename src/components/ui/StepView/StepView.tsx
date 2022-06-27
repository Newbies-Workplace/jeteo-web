import styles from "./StepView.module.scss";
import cs from "classnames";
import React from "react";
import NextArrow from "../../../assets/vectors/next-arrow.svg"

interface StepViewProps {
    steps: string[]
    activeStepIndex: number
}

interface ClickableStepViewProps {
    steps: string[]
    activeStepIndex: number
    onStepClicked: (index: number) => void
}

export const ClickableStepView: React.FC<ClickableStepViewProps> = ({steps, activeStepIndex, onStepClicked}) => {
    return (
        <div className={styles.clickableSteps}>
            {steps.map((step, i) => {
                return <div key={i.toString()} onClick={() => onStepClicked(i)} className={styles.clickableStepContainer}>
                    {singleStep(i + 1, step, i === activeStepIndex)}
                </div>
            })}
        </div>
    )
}

export const StepView: React.FC<StepViewProps> = ({steps, activeStepIndex}) => {
    return (
        <div className={styles.steps}>
            {steps.map((step, i) => {
                const shouldPlaceArrow = i < steps.length - 1

                return <div key={i.toString()} className={styles.stepContainer}>
                    {singleStep(i + 1, step, i === activeStepIndex)}
                    {shouldPlaceArrow && <NextArrow width={28} height={28}/>}
                </div>
            })}
        </div>
    )
}

const singleStep = (index: number, title: string, isSelected: boolean) => {
    return (
        <div className={styles.step}>
            <span className={cs(styles.index, {[styles.indexActive]: isSelected})}>
                {index}
            </span>

            <span className={cs(styles.text, {[styles.textActive]: isSelected})}>
                {title}
            </span>
        </div>
    )
}