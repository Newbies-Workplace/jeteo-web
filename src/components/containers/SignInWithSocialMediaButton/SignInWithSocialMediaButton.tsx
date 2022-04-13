import React from "react";

import styles from "./SignInWithSocialMediaButton.module.css";
import Provider from "../../../api/rest/auth/oauth/Provider";

interface Props {
    label: string;
    provider: Provider;
}

export const SignInWithSocialMediaButton: React.FC<Props> = ({ label, provider }) => {
    return (
        <a href={`${__RESTAPI_URI__}/oauth/login/${provider}`} className={styles.provider}>
            {label}
        </a>
    );
};

export default SignInWithSocialMediaButton;