import React from "react";

import styles from "./SignInWithSocialMediaButton.module.css";
import OAuthProviders from "../../../api/rest/auth/oauth/OAuthProviders";

interface Props {
    label: string;
    provider: OAuthProviders;
}

export const SignInWithSocialMediaButton: React.FC<Props> = ({ label, provider }) => {
    return (
        <a href={`${__RESTAPI_URI__}/oauth/login/${provider}`} className={styles.provider}>
            {label}
        </a>
    );
};

export default SignInWithSocialMediaButton;