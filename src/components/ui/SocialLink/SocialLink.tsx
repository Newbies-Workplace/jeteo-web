import React from "react";
import styles from "./SocialLink.module.scss" 


interface SocialLinkProps {
    name: string
    url: string
    icon?: React.ReactNode
}


const SocialLink: React.FC<SocialLinkProps> = ({name, url, icon}) => {

    return (
        <a href={url} className={styles.socialLinkContainer} >
            {icon}
            <span className={styles.socialLinkName}>{name}</span>
        </a>
    )
}

export default SocialLink;