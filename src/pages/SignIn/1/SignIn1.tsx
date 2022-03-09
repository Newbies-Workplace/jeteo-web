import React from 'react';

import BackgroundWrapper from '../../../components/BackgroundWrapper/BackgroundWrapper';
import Navbar from "../../../components/Navbar/Navbar"
import PageContentContainer from '../../../components/PageContentContainer/PageContentContainer';
import AuthContainer from '../../../components/AuthContainer/AuthContainer';
import JeteoLogo from '../../../components/JeteoLogo/JeteoLogo';
import AuthHeadline from '../../../components/AuthHeadline/AuthHeadline';
import AuthSubtitle from '../../../components/AuthSubtitle/AuthSubtitle';
import SocialMediaProvidersContainer from '../../../components/SocialMediaProvidersContainer/SocialMediaProvidersContainer';
import SignInWithSocialMediaButton from '../../../components/SignInWithSocialMediaButton/SignInWithSocialMediaButton';

import { useHistory } from 'react-router-dom';

// /auth/callback/github?code=cb5e4c60b9418cf301e9&state=34207b859e18ecb0

export const SignIn1: React.FC = () => {

    const { push } = useHistory();

    // const navigateToNextStep = () => push("/sign-in/2");
    // const connectToGithub = () => push("/signin");

    return (
        <BackgroundWrapper>
            <Navbar />
            <PageContentContainer>
                <AuthContainer>
                    <JeteoLogo theme="dark" />
                    <AuthHeadline>
                        Zaczynamy przygodę 🚀
                    </AuthHeadline>
                    <AuthSubtitle>
                        Kontynuuj przez:
                    </AuthSubtitle>
                    <SocialMediaProvidersContainer>
                        <SignInWithSocialMediaButton socialMedia="twitter" />
                        <SignInWithSocialMediaButton socialMedia="facebook" />
                        <SignInWithSocialMediaButton socialMedia="github" />
                        <SignInWithSocialMediaButton socialMedia="google" />
                    </SocialMediaProvidersContainer>
                    <AuthSubtitle>
                        Nie ma tu twojej ulubionej domeny?
                    </AuthSubtitle>
                    <AuthSubtitle marginless bold>
                        Daj nam znać!
                    </AuthSubtitle>
                </AuthContainer>
            </PageContentContainer>
        </BackgroundWrapper>
    )
};

export default SignIn1;