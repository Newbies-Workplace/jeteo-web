import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';

import { GithubCallback } from './github';
import {GithubDevCallback} from "./githubdev/GithubDevCallback";


export const CallbackRouter: React.FC = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/github`}>
                <GithubCallback />
            </Route>

            <Route path={`${path}/devgithub`}>
                <GithubDevCallback />
            </Route>

            <Route path="*">
                <Redirect to={`/auth/error?error=unknown`} />
            </Route>
        </Switch>
    )
};
