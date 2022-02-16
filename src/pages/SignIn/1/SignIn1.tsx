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

export const SignIn1: React.FC = () => {

    const { push } = useHistory();

    const navigateToNextStep = () => push("/sign-in/2");
    const connectToGithub = () => push("/signin");

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
                        <SignInWithSocialMediaButton onClick={connectToGithub} socialMedia="Github" />
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