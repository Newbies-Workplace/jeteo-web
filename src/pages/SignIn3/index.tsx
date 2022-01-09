import React, { useContext } from 'react';

import BackgroundWrapper from '../../components/BackgroundWrapper';
import Navbar from "../../components/Navbar"
import PageContentContainer from '../../components/PageContentContainer';
import AuthContainer from '../../components/AuthContainer';
import JeteoLogo from '../../components/JeteoLogo';
import AuthHeadline from '../../components/AuthHeadline';
import AuthPrimaryButton from '../../components/AuthPrimaryButton';

// import { useHistory } from 'react-router-dom';
import AuthSubtitle from '../../components/AuthSubtitle';
import AuthButtonsContainer from '../../components/AuthButtonsContainer';
import AuthSecondaryButton from '../../components/AuthSecondaryButton';
import { useAuth } from '../../common/auth/context/useAuth.hook';

export const SignIn3: React.FC = () => {
    // const { push } = useHistory();
    const { user } = useAuth();

    return (
        <BackgroundWrapper>
            <Navbar />
            <PageContentContainer>
                <AuthContainer>
                    <JeteoLogo theme="dark" />
                    <AuthHeadline>
                        Witaj, {user?.nickname || ""}
                    </AuthHeadline>
                    <AuthSubtitle>
                        Co cię interesuje?
                    </AuthSubtitle>
                    <AuthButtonsContainer>
                        <AuthSecondaryButton>
                            Pomiń
                        </AuthSecondaryButton>
                        <AuthPrimaryButton>
                            Gotowe
                        </AuthPrimaryButton>
                    </AuthButtonsContainer>
                    <AuthSubtitle>
                        Psst, swoje zainteresowania możesz później dostosować w ustawieniach
                    </AuthSubtitle>
                </AuthContainer>
            </PageContentContainer>
        </BackgroundWrapper>
    )
};

export default SignIn3;