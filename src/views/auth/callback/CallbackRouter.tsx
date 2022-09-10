import React from 'react';
import {Navigate, Route, Routes} from 'react-router';
import {GenericCallback} from './GenericCallback';
import OAuthProvider from "../../../api/rest/auth/oauth/OAuthProvider.enum";

export const CallbackRouter: React.FC = () => {
    return (
        <Routes>
            <Route
                element={<GenericCallback provider={OAuthProvider.github}/>}
                path="github"/>

            {__DEV__ &&
                <Route
                    element={<GenericCallback provider={OAuthProvider.githubDev}/>}
                    path="devgithub"/>
            }

            <Route
                path="*"
                element={() => <Navigate replace to={`/auth/error?error=Invalid+provider`} />}/>
        </Routes>
    )
};
