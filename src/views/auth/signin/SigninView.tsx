import React from 'react';

import ProvidersList from "../../../api/rest/auth/oauth/OAuthProviders";

import AuthHeadline from "../../../components/containers/AuthHeadline/AuthHeadline";
import AuthSubtitle from "../../../components/containers/AuthSubtitle/AuthSubtitle";
import SocialMediaProvidersContainer
    from "../../../components/containers/SocialMediaProvidersContainer/SocialMediaProvidersContainer";
import SignInWithSocialMediaButton from "../../../components/containers/SignInWithSocialMediaButton/SignInWithSocialMediaButton";


export const SigninView: React.FC = () => {

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
