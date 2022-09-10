import React from 'react';
import {Navigate} from "react-router-dom";
import {OAuthStatus, useGenericOAuthCallback} from "../../../contexts/auth/hooks/useGenericOAuthCallback.hook";
import OAuthProvider from "../../../api/rest/auth/oauth/OAuthProvider.enum";

interface GenericCallbackProps {
    provider: OAuthProvider
}

export const GenericCallback: React.FC<GenericCallbackProps> = ({provider}) => {
    const {error, status} = useGenericOAuthCallback(provider);

    switch (status) {
        case OAuthStatus.error:
            return <Navigate replace to={`/auth/error?message=${error}`}/>

        case OAuthStatus.pending:
            return <p>Jeszcze moment ⏳</p>

        default:
            return <Navigate to={`/`}/>
    }
};
