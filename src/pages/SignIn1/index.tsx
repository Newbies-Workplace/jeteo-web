import React from 'react';

import BackgroundWrapper from '../../components/BackgroundWrapper';
import Navbar from "../../components/Navbar"
import PageContentContainer from '../../components/PageContentContainer';
import AuthContainer from '../../components/AuthContainer';
import JeteoLogo from '../../components/JeteoLogo';
import AuthHeadline from '../../components/AuthHeadline';
import AuthSubtitle from '../../components/AuthSubtitle';
import SocialMediaProvidersContainer from '../../components/SocialMediaProvidersContainer';
import SignInWithSocialMediaButton from '../../components/SignInWithSocialMediaButton';

import { useHistory } from 'react-router-dom';

export const SignIn1: React.FC = () => {

    const { push } = useHistory();

    const navigateToNextStep = () => push("/sign-in/2");

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
                        <SignInWithSocialMediaButton onClick={navigateToNextStep} socialMedia="Twitter" />
                        <SignInWithSocialMediaButton onClick={navigateToNextStep} socialMedia="Facebook" />
                        <SignInWithSocialMediaButton onClick={navigateToNextStep} socialMedia="Github" />
                        <SignInWithSocialMediaButton onClick={navigateToNextStep} socialMedia="Google" />
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