import { FC } from "react";

import { Redirect, Route, Switch, useRouteMatch } from "react-router";

import { GithubCallback } from './github';

export const CallbackRouter: FC = function() {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/github`} component={GithubCallback} />
            <Route path="*">
                <Redirect to={`/auth/error?error=unknown`} />
            </Route>
        </Switch>
    );
};

export default CallbackRouter;