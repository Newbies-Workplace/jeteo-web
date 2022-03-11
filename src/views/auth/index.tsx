import React from 'react';
import {
    Routes,
    Route
} from 'react-router-dom';
import { CallbackRouter } from './callback/CallbackRouter';
import { SigninView } from './signin/SigninView';
import { SignupView } from './signup/SignupView';

export const AuthRouter: React.FC = () => {
    return (
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
        </Routes>
    )
};
