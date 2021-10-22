import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

/**
 * Most advanced auth component
 */
export const GithubCallback: React.FC = () => {

    const [content, setContent] = useState<JSX.Element>(<p>Hold on for 10 sec</p>);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setContent(
                <Redirect to="/" />
            )
        }, 10 * 1000)

        return () => {
            timeout.unref();
        }
    }, [])

    return (
        <>
            <h1>Hi back!</h1>
            {content}
        </>
    )
};
