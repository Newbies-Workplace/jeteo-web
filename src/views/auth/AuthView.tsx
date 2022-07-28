import React, {CSSProperties} from 'react';
import { Routes, Route } from 'react-router-dom';
import { CallbackRouter } from './callback/CallbackRouter';
import { SignInView } from './signIn/SignInView';
import { SignUpView } from './signUp/SignUpView';
import GalaxyBackground from "../../components/containers/GalaxyBackground/GalaxyBackground";
import PageContentContainer from "../../components/containers/PageContentContainer/PageContentContainer";
import AuthContainer from "../../components/containers/AuthContainer/AuthContainer";
import {AppLogo} from "../../components/ui/AppLogo/AppLogo";
import {AuthErrorView} from "./error/AuthErrorView";
import {NavBar} from "../../components/ui/NavBar/NavBar";
import {ErrorBoundary} from "react-error-boundary";
import {Navigate} from "react-router";

export const AuthRouter: React.FC = () => {

    const divStyles: CSSProperties = {
        display: 'flex',
        justifyContent: 'stretch',
        alignItems: 'stretch',
        flexDirection: 'column',
        height: '100vh'
    }

    return (
        <GalaxyBackground>
            <div style={divStyles}>
                <div><NavBar invertColor/></div>
                <PageContentContainer>
                    <AuthContainer>
                        <AppLogo/>

                        {/* catch any error in process and redirect to error subview */}
                        <ErrorBoundary
                            FallbackComponent={(err) => <Navigate to={`/auth/error?message=${err.error.message}`}/>}>

                            <Routes>
                                <Route
                                    element={<SignInView/>}
                                    path="signin/*"/>
                                <Route
                                    element={<SignUpView/>}
                                    path="signup/*"/>
                                <Route
                                    element={<CallbackRouter/>}
                                    path="callback/*"/>
                                <Route
                                    element={<AuthErrorView/>}
                                    path="error"/>
                                <Route
                                    element={<Navigate to="signin"/>}
                                    path="*" />
                            </Routes>
                        </ErrorBoundary>
                    </AuthContainer>
                </PageContentContainer>
            </div>
        </GalaxyBackground>
    )
};
