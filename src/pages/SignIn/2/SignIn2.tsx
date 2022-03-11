import React from 'react';

import BackgroundWrapper from '../../../components/BackgroundWrapper/BackgroundWrapper';
import Navbar from "../../../components/Navbar/Navbar"
import PageContentContainer from '../../../components/PageContentContainer/PageContentContainer';
import AuthContainer from '../../../components/AuthContainer/AuthContainer';
import JeteoLogo from '../../../components/JeteoLogo/JeteoLogo';
import AuthHeadline from '../../../components/AuthHeadline/AuthHeadline';
import AuthInputForm from '../../../components/AuthInputForm/AuthInputForm';
import AuthPrimaryButton from '../../../components/AuthPrimaryButton/AuthPrimaryButton';

import { useHistory } from 'react-router-dom';

export const SignIn2: React.FC = () => {
    const { push } = useHistory();

    const navigateToNextStep = () => push("/sign-in/3");

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

export default SignIn2;