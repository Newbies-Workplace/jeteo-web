import React from "react";
import cs from "classnames";
import styles from "./Dropdown.module.scss";

export interface Option {
    key: string
    icon?: React.ReactNode
    label: string
    onClick: () => void
}

interface DropdownProps {
    options: Option[]
    selectedOptionIndex: number
}

const Dropdown: React.FC<DropdownProps> = ({options, selectedOptionIndex}) => {
    return (
        <div className={styles.dropdown}>
            {options.map((option, i) =>
                <DropdownOption
                    key={option.key}
                    icon={option.icon}
                    selected={i === selectedOptionIndex}
                    label={option.label}
                    onClick={() => option.onClick()} />
            )}
        </div>
    )
}

interface DropdownOptionProps {
    icon?: React.ReactNode
    label: string
    selected: boolean
    onClick: () => void
}

const DropdownOption: React.FC<DropdownOptionProps> = ({icon, label, selected, onClick}) => (
    <div className={cs(styles.dropdownOption, {[styles.selected]: selected})} onClick={() => onClick()}>
        {label}
        {icon}
    </div>
)

export default Dropdown