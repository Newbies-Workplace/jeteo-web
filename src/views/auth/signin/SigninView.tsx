import React from 'react';


export const SigninView: React.FC = () => {

    return (
        <>
            <p>Placeholder signin view</p>

            <ol>
                <li>
                    <a href={`${__RESTAPI_URI__}/oauth/login/github`}>Github login thing</a>
                </li>

                {__DEV__ &&
                    <li>
                        <a href={`${__RESTAPI_URI__}/oauth/login/devgithub`}>Github [dev 🚧] login thing</a>
                    </li>
                }
            </ol>
        </>
    )
}