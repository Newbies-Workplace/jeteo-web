import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { useAuth } from '../../../../contexts/auth/hooks/useAuth.hook';
import Providers from '../../../../api/rest/auth/oauth/Provider';
import {useQuery} from "../../../../common/utils/useQuery";

export const GithubDevCallback: React.FC = () => {
    const { auth } = useAuth();
    const navigator = useNavigate();

    const query = useQuery();
    const code = query.get('code');
    const error = query.get('error');
    const state = query.get('state') || undefined;

    useEffect(() => {
        if (error)
            return navigator(`/auth/error?message=${error}`, {replace: true});

        if (code && state) {
            auth(Providers.githubDev, code, state)
                .then(() =>
                    navigator("/")
                )
                .catch((err) =>
                    navigator(`/auth/error?message=${err.message}`, {replace: true})
                );
        }
        else
            navigator("/auth/error?message=Missing+code+or+state", {replace: true});
    }, [])

    return (
        <p>Connecting with github...</p>
    )
};
