import React from "react";
import styles from "./SocialLink.module.scss"

interface SocialLinkProps {
    name: string
}

export const SocialLink: React.FC<SocialLinkProps> = ({name}) => {
    return (
        <div className={styles.content}>
            {name}
        </div>
    )
}