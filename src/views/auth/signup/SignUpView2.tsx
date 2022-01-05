import React from 'react';

import BackgroundWrapper from '../../../components/BackgroundWrapper';
import Navbar from "../../../components/Navbar"
import PageContentContainer from '../../../components/PageContentContainer';
import AuthContainer from '../../../components/AuthContainer';
import JeteoLogo from '../../../components/JeteoLogo';
import AuthHeadline from '../../../components/AuthHeadline';
import AuthInputForm from '../../../components/AuthInputForm';
import AuthPrimaryButton from '../../../components/AuthPrimaryButton';

import { useHistory } from 'react-router-dom';

export const SignupView2: React.FC = () => {
    const { push } = useHistory();

    const navigateToNextStep = () => push("/register/3");

    return (
        <BackgroundWrapper>
            <Navbar />
            <PageContentContainer>
                <AuthContainer>
                    <JeteoLogo theme="dark" />
                    <AuthHeadline>
                        Jak się nazywasz? 🤔
                    </AuthHeadline>
                    <AuthInputForm />
                    <AuthPrimaryButton margin onClick={navigateToNextStep}>
                        Gotowe
                    </AuthPrimaryButton>
                </AuthContainer>
            </PageContentContainer>
        </BackgroundWrapper>
    )
};

export default SignupView2;