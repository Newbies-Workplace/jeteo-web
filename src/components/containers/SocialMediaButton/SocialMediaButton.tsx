import React from "react"
import styles from "./SocialMediaButton.module.css"
import OAuthProvider from "../../../api/rest/auth/oauth/OAuthProvider.enum"

interface Props {
    label: string
    icon?: React.ReactNode
    provider: OAuthProvider
}

export const SocialMediaButton: React.FC<Props> = ({ label, icon, provider }) => {
    return (
        <a href={`${__RESTAPI_URI__}/oauth/login/${provider}`} className={styles.provider}>
            <div className={styles.icon}>
                {icon}
            </div>

            {label}
        </a>
    )
}

export default SocialMediaButton