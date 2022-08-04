import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {CallbackRouter} from './callback/CallbackRouter';
import {SignInView} from './signIn/SignInView';
import {SignUpView} from './signUp/SignUpView';
import GalaxyBackground from "../../components/containers/GalaxyBackground/GalaxyBackground";
import Dialog from "../../components/containers/Dialog/Dialog";
import {AppLogo} from "../../components/ui/AppLogo/AppLogo";
import {AuthErrorView} from "./error/AuthErrorView";
import {NavBar} from "../../components/ui/NavBar/NavBar";
import {ErrorBoundary} from "react-error-boundary";
import {Navigate} from "react-router";
import styles from "./AuthView.module.scss"

export const AuthView: React.FC = () => {
    return (
        <GalaxyBackground>
            <div className={styles.authContainer}>
                <NavBar invertColor/>
                <div className={styles.contentContainer}>
                    <Dialog className={styles.authDialog}>
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
                    </Dialog>
                </div>
            </div>
        </GalaxyBackground>
    )
};
