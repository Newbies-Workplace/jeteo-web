import React from "react";

import styles from "./SignInWithSocialMediaButton.module.css";
import ProvidersList from "../../common/models/ProvidersList";

interface Props {
    label: string;
    provider: ProvidersList;
}

export const SignInWithSocialMediaButton: React.FC<Props> = ({ label, provider }) => {
    return (
        <a href={`${__API_URL__}/oauth/login/${provider}`} className={styles.provider}>
            {label}
        </a>
    );
};

export default SignInWithSocialMediaButton;