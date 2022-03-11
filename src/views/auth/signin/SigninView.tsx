import React from 'react';

import ProvidersList from "../../../common/models/ProvidersList";

import AuthHeadline from "../../../components/AuthHeadline/AuthHeadline";
import AuthSubtitle from "../../../components/AuthSubtitle/AuthSubtitle";
import SocialMediaProvidersContainer
    from "../../../components/SocialMediaProvidersContainer/SocialMediaProvidersContainer";
import SignInWithSocialMediaButton from "../../../components/SignInWithSocialMediaButton/SignInWithSocialMediaButton";


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

                {process.env.NODE_ENV === 'development' &&
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
