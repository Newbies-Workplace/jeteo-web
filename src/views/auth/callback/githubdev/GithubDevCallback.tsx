import React from 'react';
import {Navigate} from "react-router-dom";
import {OAuthStatus, useGenericOAuthCallback} from "../../../../contexts/auth/hooks/useGenericOAuthCallback.hook";
import OAuthProviders from "../../../../api/rest/auth/oauth/OAuthProviders";

export const GithubDevCallback: React.FC = () => {
    const {error, status} = useGenericOAuthCallback(OAuthProviders.githubDev);

    switch (status) {
        case OAuthStatus.error:
            return <Navigate replace to={`/auth/error?message=${error}`}/>

        case OAuthStatus.pending:
            return <p>Loader</p>

        default:
            return <Navigate to={`/`}/>
    }
};
