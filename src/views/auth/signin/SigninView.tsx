import React from 'react';


export const SigninView: React.FC = () => {

    return (
        <>
            <p>Placeholder signin view</p>

            <a href={`${process.env.API_URL}/oauth/login/github`}>Github login thing</a>
        </>
    )
}

export default SigninView;