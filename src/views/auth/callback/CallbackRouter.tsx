import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { GithubCallback } from './github/GithubCallback';
import { GithubDevCallback } from "./githubdev/GithubDevCallback";

export const CallbackRouter: React.FC = () => {

    return (

        <Routes>
            <Route
                element={<GithubCallback/>}
                path="github"/>

            {process.env.NODE_ENV === 'development' &&
                <Route
                    element={<GithubDevCallback/>}
                    path="devgithub"/>
            }

            <Route
                path="*"
                element={() => <Navigate replace to={`/auth/error?error=Invalid+provider`} />}/>
        </Routes>
    )
};
