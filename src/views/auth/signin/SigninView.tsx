import React, {useEffect} from 'react';

import ProvidersList from "../../../api/rest/auth/oauth/OAuthProvider.enum";

import AuthHeadline from "../../../components/containers/AuthHeadline/AuthHeadline";
import AuthSubtitle from "../../../components/containers/AuthSubtitle/AuthSubtitle";
import SocialMediaProvidersContainer from "../../../components/containers/SocialMediaProvidersContainer/SocialMediaProvidersContainer";
import SignInWithSocialMediaButton from "../../../components/containers/SignInWithSocialMediaButton/SignInWithSocialMediaButton";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../contexts/auth/hooks/useAuth.hook";
import {useQueryParams} from "../../../common/utils/useQueryParams";


export const SigninView: React.FC = () => {

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
            <AuthHeadline>
                Zaczynamy przygodę 🚀
            </AuthHeadline>
            <AuthSubtitle>
                Kontynuuj przez:
            </AuthSubtitle>

            <SocialMediaProvidersContainer>

                <SignInWithSocialMediaButton
                    label="Github"
                    provider={ProvidersList.github} />

                {__DEV__ &&
                    <SignInWithSocialMediaButton
                        label="Github Dev 🥓"
                        provider={ProvidersList.githubDev} />
                }

            </SocialMediaProvidersContainer>
            <AuthSubtitle>
                Nie ma tu twojej ulubionej domeny?
            </AuthSubtitle>
            <AuthSubtitle marginless bold>
                Daj nam znać!
            </AuthSubtitle>
        </>
    )
};
