import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { useQuery } from '../../../../common/utils/useQuery';
import { useAuth } from '../../../../common/auth/useAuth.hook';
import Providers from '../../../../common/models/ProvidersList';

export const GithubDevCallback: React.FC = () => {
    const { auth, user } = useAuth();

    const query = useQuery();
    const token = query.get('code');
    const state = query.get('state') || undefined;

    const [content, setContent] = useState<JSX.Element>(<p>Authorizing [<b>dev 🚧</b>]...</p>);

    useEffect(() => {

        if (token) {
            auth(Providers.githubDev, token, state)
                .then(() => {
                    setContent(() => <p>Redirect in 10s</p>)
                    setTimeout(() => { setContent(<Navigate to="/" />) }, 5 * 1000);
                })
                .catch(console.error)
        }
    }, [token])

    return (
        <>
            {user ? <> Sup <b>{user.nickname}</b>! </> : "Hold on"}
            {content}
        </>
    )
};