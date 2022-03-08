import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useQuery } from '../../../../common/utils/useQuery';
import { useAuth } from '../../../../common/auth/context/useAuth.hook';
import Providers from '../../../../common/models/ProvidersList';

export const GithubDevCallback: React.FC = () => {
    const { auth, user } = useAuth();

    const query = useQuery();
    const token = query.get('code');

    const [content, setContent] = useState<JSX.Element>(<p>Authorizing [<b>dev 🚧</b>]...</p>);

    useEffect(() => {

        if (token) {
            auth(Providers.githubDev, token)
                .then(() => {
                    setContent(() => <p>Redirect in 10s</p>)
                    setTimeout(() => { setContent(<Redirect to="/" />) }, 5 * 1000);
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
