import React from "react";

import BackgroundWrapper from "../../../components/BackgroundWrapper/BackgroundWrapper";
import Navbar from "../../../components/Navbar/Navbar"
import PageContentContainer from "../../../components/PageContentContainer/PageContentContainer";
import AuthContainer from "../../../components/AuthContainer/AuthContainer";
import JeteoLogo from "../../../components/JeteoLogo/JeteoLogo";
import AuthHeadline from "../../../components/AuthHeadline/AuthHeadline";
import AuthPrimaryButton from "../../../components/AuthPrimaryButton/AuthPrimaryButton";
import AuthSubtitle from "../../../components/AuthSubtitle/AuthSubtitle";
import AuthButtonsContainer from "../../../components/AuthButtonsContainer/AuthButtonsContainer";
import AuthSecondaryButton from "../../../components/AuthSecondaryButton/AuthSecondaryButton";

import { useAuth } from "../../../common/auth/useAuth.hook";

export const SignIn3: React.FC = () => {
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