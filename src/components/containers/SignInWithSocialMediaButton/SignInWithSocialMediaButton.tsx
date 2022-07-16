import React from "react";

import styles from "./SignInWithSocialMediaButton.module.css";
import OAuthProvider from "../../../api/rest/auth/oauth/OAuthProvider.enum";

interface Props {
    label: string;
    provider: OAuthProvider;
}

export const SignInWithSocialMediaButton: React.FC<Props> = ({ label, provider }) => {
    return (
        <a href={`${__RESTAPI_URI__}/oauth/login/${provider}`} className={styles.provider}>
            {label}
        </a>
    );
};

export default SignInWithSocialMediaButton;