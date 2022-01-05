import React from 'react';

import BackgroundWrapper from '../../../components/BackgroundWrapper';
import Navbar from "../../../components/Navbar"
import PageContentContainer from '../../../components/PageContentContainer';
import AuthContainer from '../../../components/AuthContainer';
import JeteoLogo from '../../../components/JeteoLogo';
import AuthHeadline from '../../../components/AuthHeadline';
import AuthSubtitle from '../../../components/AuthSubtitle';
import SocialMediaProvidersContainer from '../../../components/SocialMediaProvidersContainer';
import SocialMediaProvider from '../../../components/SocialMediaProvider';

import { useHistory } from 'react-router-dom';

export const SignupView: React.FC = () => {

    const { push } = useHistory();

    const navigateToNextStep = () => push("/register/2");

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
                        <SocialMediaProvider onClick={navigateToNextStep} socialMedia="Twitter" />
                        <SocialMediaProvider onClick={navigateToNextStep} socialMedia="Facebook" />
                        <SocialMediaProvider onClick={navigateToNextStep} socialMedia="Github" />
                        <SocialMediaProvider onClick={navigateToNextStep} socialMedia="Google" />
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

export default SignupView;