import React, {useEffect} from 'react';

import ProvidersList from "../../../api/rest/auth/oauth/OAuthProvider.enum";
import SocialMediaButton from "../../../components/ui/SocialMediaButton/SocialMediaButton";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../contexts/auth/hooks/useAuth.hook";
import {useQueryParams} from "../../../common/utils/useQueryParams";
import authStyles from "../../../common/styles/AuthStyles.module.scss"
import styles from "./SignInView.module.scss"
import Github from "../../../assets/icons/github.svg"
import Google from "../../../assets/icons/google.svg"
import Roadblock from "../../../assets/icons/roadblock.svg"
import cs from "classnames";

export const SignInView: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { redirect } = useQueryParams();

    // workaround for refreshing user's session
    useEffect(() => {
        if (user) {
            if (typeof redirect === "string")
                navigate(redirect);
        }
    }, [user?.id, redirect]);

    return (
        <>
            <span className={authStyles.title}>Zaczynamy przygodę 🚀</span>
            <span className={cs(authStyles.subtitle, styles.continueWith)}>Kontynuuj przez:</span>

            <div className={styles.socialSection}>
                <SocialMediaButton
                    label="GitHub"
                    icon={<Github width={20} height={20}/>}
                    href={`${__RESTAPI_URI__}/oauth/login/${ProvidersList.github}`} />

                <SocialMediaButton
                    label="Google"
                    icon={<Google width={20} height={20}/>}
                    href={`${__RESTAPI_URI__}/oauth/login/${ProvidersList.google}`} />

                {__DEV__ &&
                    <SocialMediaButton
                        label="GitHub Dev"
                        icon={<Roadblock width={20} height={20}/>}
                        href={`${__RESTAPI_URI__}/oauth/login/${ProvidersList.githubDev}`} />
                }
            </div>

            <div className={styles.footer}>
                <span className={authStyles.subtitle}>Nie ma tu twojej ulubionej platformy do rejestracji?</span>
                <b className={authStyles.subtitle}>Daj nam znać!</b>
            </div>
        </>
    )
};
