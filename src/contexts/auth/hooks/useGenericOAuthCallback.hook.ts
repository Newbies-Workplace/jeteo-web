import {useEffect, useState} from 'react';
import {useAuth} from "./useAuth.hook";
import OAuthProviders from "../../../api/rest/auth/oauth/OAuthProviders";
import {useQueryParams} from "../../../common/utils/useQueryParams";

export enum OAuthStatus {
    pending,
    success,
    error,
}

export interface OAuthCallbackRet {
    error: string|null
    status: OAuthStatus
}

export const useGenericOAuthCallback = (provider: OAuthProviders): OAuthCallbackRet => {
    const [status, setStatus] = useState<OAuthStatus>(OAuthStatus.pending);
    const [error, setError] = useState<string|null>(null);

    const { auth } = useAuth();
    const query = useQueryParams();

    const setErrorWithState = (msg: string): void => {
        setError(msg);
        setStatus(OAuthStatus.error);
    }

    useEffect(() => {
        const errorParam = query.get('error');

        if (errorParam)
            setErrorWithState(errorParam);

    }, [query.get('error')])

    useEffect(() => {
        if (error || query.get('error'))
            return;

        const code = query.get('code');
        if (!code)
            return setErrorWithState('Code param is missing');

        const state = query.get('state');
        if (!state)
            return setErrorWithState('State param is missing');

        auth(provider, code, state)
            .then(() => {
                setStatus(OAuthStatus.success);
            })
            .catch(err => setErrorWithState(`auth failed: ${err.message}`))

    }, [query.get('code'), query.get('state')])

    return {
        error,
        status
    }
}