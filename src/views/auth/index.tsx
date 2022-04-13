import React, {CSSProperties} from 'react';
import {
    Routes,
    Route
} from 'react-router-dom';
import { CallbackRouter } from './callback/CallbackRouter';
import { SigninView } from './signin/SigninView';
import { SignupView } from './signup/SignupView';
import GalaxyBackground from "../../components/containers/GalaxyBackground/GalaxyBackground";
import PageContentContainer from "../../components/containers/PageContentContainer/PageContentContainer";
import AuthContainer from "../../components/containers/AuthContainer/AuthContainer";
import {AppLogo} from "../../components/ui/AppLogo/AppLogo";
import {AuthErrorView} from "./error/AuthErrorView";
import {NavBar} from "../../components/ui/NavBar/NavBar";

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
                <div>
                    <NavBar invertColor/>
                </div>
                <PageContentContainer>
                    <AuthContainer>
                        <AppLogo/>
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
            </div>
        </GalaxyBackground>
    )
};
