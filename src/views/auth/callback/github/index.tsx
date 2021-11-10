import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { authByGithub } from '../../../../common/auth/service/callback';
import { useQuery } from '../../../../common/utils/useQuery';
import jwt_decode from "jwt-decode";
import { JwtData } from '../../../../common/auth/service/jwtData.interface';
import axios from 'axios';

/**
 * Most advanced auth component
 */
export const GithubCallback: React.FC = () => {

    const [content, setContent] = useState<JSX.Element>(<p>Hold on for 10 sec</p>);

    const query = useQuery();

    useEffect(() => {
        const token = query.get('code');

        if (token) {
            authByGithub(axios, token)
                .catch(console.error)
                .then((res) => {
                    console.log(res);
                    if (res)
                        setContent(
                            <p>
                                Sup <b>{(jwt_decode(res.access_token) as JwtData).nickname}</b>!
                                <br />
                                <i>Redirect in 5 sec</i>
                            </p>
                        )

                    setTimeout(() => { setContent(<Redirect to="/" />) }, 5 * 1000);
                })
        }
        else {
            throw new Error('expected token!');
        }

    }, [query.get('code')])

    return (
        <>
            <h1>Hi back!</h1>
            {content}
        </>
    )
};
