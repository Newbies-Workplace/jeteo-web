import React from "react"
import styles from "./SocialMediaButton.module.css"

interface Props {
    label: string
    icon?: React.ReactNode
    href: string
}

export const SocialMediaButton: React.FC<Props> = ({ label, icon, href }) => {
    return (
        <a href={href} className={styles.provider}>
            <div className={styles.icon}>
                {icon}
            </div>

            {label}
        </a>
    )
}

export default SocialMediaButton