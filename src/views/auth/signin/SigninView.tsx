import React from 'react';


export const SigninView: React.FC = () => {

    return (
        <>
            <p>Placeholder signin view</p>

            <a href={`${__API_URL__}/oauth/login/github`}>Github login thing</a>
            <ol>
                <li>
                    <a href={`${process.env.API_URL}/oauth/login/github`}>Github login thing</a>
                </li>

                {__DEV__ === 'development' &&
                    <li>
                        <a href={`${__API_URL__}/oauth/login/devgithub`}>Github [dev 🚧] login thing</a>
                    </li>
                }
            </ol>
        </>
    )
}