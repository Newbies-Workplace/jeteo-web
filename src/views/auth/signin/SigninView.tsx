import React from 'react';


export const SigninView: React.FC = () => {

    return (
        <>
            <p>Placeholder signin view</p>

            <ol>
                <li>
                    <a href={`${process.env.API_URL}/oauth/login/github`}>Github login thing</a>
                </li>
                <li>
                    <a href={`${process.env.API_URL}/oauth/login/devgithub`}>Github [dev 🚧] login thing</a>
                </li>
            </ol>
        </>
    )
}