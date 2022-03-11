import React from 'react';
import {
    Routes,
    Route
} from 'react-router-dom';
import { CallbackRouter } from './callback/CallbackRouter';
import { SigninView } from './signin/SigninView';
import { SignupView } from './signup/SignupView';
import Navbar from "../../components/Navbar/Navbar";
import BackgroundWrapper from "../../components/BackgroundWrapper/BackgroundWrapper";
import PageContentContainer from "../../components/PageContentContainer/PageContentContainer";
import AuthContainer from "../../components/AuthContainer/AuthContainer";
import JeteoLogo from "../../components/JeteoLogo/JeteoLogo";
import {AuthErrorView} from "./error/AuthErrorView";

export const AuthRouter: React.FC = () => {
    return (
        <BackgroundWrapper>
            <Navbar />
            <PageContentContainer>
            <AuthContainer>
                <JeteoLogo theme="dark" />
                    <Routes>
                        <Route
                            element={<SigninView/>}
                            path="signin/*"/>
                        <Route
                            element={<SignupView/>}
                            path="signup/*"/>
                        <Route
                            element={<CallbackRouter/>}
                            path="callback/*"/>
                        <Route
                            element={<AuthErrorView/>}
                            path="error"/>
                    </Routes>
                </AuthContainer>
            </PageContentContainer>
        </BackgroundWrapper>
    )
};
