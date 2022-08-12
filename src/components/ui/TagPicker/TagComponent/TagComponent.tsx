import React from "react";
import styles from "./TagComponent.module.scss";
import Close from "../../../../assets/vectors/close.svg";

interface TagComponentProps {
    label: string
    onRemoveClick: () => void
}

const TagComponent: React.FC<TagComponentProps> = ({label, onRemoveClick}) => (
    <div className={styles.tag}>
        {label}
        <Close className={styles.close} onClick={onRemoveClick}/>
    </div>
)

export default TagComponent