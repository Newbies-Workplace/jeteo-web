import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';

import { GithubCallback } from './github';


export const CallbackRouter: React.FC = () => {

    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/github`}>
                <GithubCallback />
            </Route>

            <Route path="*">
                <Redirect to={`/auth/error?error=unknown`} />
            </Route>
        </Switch>
    )
};
