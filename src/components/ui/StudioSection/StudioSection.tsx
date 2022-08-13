import React from "react";
import styles from "./StudioSection.module.scss";

interface StudioSectionProps {
    title: string,
}

export const StudioSection: React.FC<StudioSectionProps> = ({title, children}) => {
    return (
        <div className={styles.container}>
            <div className={styles.sectionDecorator}>
                <div className={styles.dot}/>
                <div className={styles.line}/>
            </div>
            <div className={styles.sectionContent}>
                <span className={styles.title}>{title}</span>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    )
}