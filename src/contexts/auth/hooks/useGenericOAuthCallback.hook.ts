import {useEffect, useState} from 'react';
import {useAuth} from "./useAuth.hook";
import OAuthProvider from "../../../api/rest/auth/oauth/OAuthProvider.enum";
import {useQueryParamsHook} from "./useQueryParams.hook";

export enum OAuthStatus {
    pending,
    success,
    error,
}

export interface OAuthCallbackRet {
    error: string|null
    status: OAuthStatus
}

export const useGenericOAuthCallback = (provider: OAuthProvider): OAuthCallbackRet => {
    const [status, setStatus] = useState<OAuthStatus>(OAuthStatus.pending);
    const [error, setError] = useState<string|null>(null);

    const { auth } = useAuth();
    const {error: errorParam, code: codeParam, state: stateParam} = useQueryParamsHook();

    const setErrorWithState = (msg: string): void => {
        setError(msg);
        setStatus(OAuthStatus.error);
    }

    useEffect(() => {
        if (errorParam)
            setErrorWithState(errorParam.toString());
    }, [errorParam])

    useEffect(() => {
        if (error || errorParam)
            return;

        if (!codeParam)
            return setErrorWithState('Code param is missing');

        if (!stateParam)
            return setErrorWithState('State param is missing');

        auth(provider, codeParam.toString(), stateParam.toString())
            .then(() => {
                setStatus(OAuthStatus.success);
            })
            .catch(err => setErrorWithState(`auth failed: ${err.message}`))

    }, [codeParam, stateParam])

    return {
        error,
        status
    }
}