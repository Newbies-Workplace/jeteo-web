import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch
} from 'react-router-dom';
import { CallbackRouter } from './callback/CallbackRouter';
import { SigninView } from './signin/SigninView';
import { SignupView } from './signup/SignupView1';

export const AuthRouter: React.FC = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/signin`}>
                <SigninView />
            </Route>
            <Route path={`${path}/signup`}>
                <SignupView />
            </Route>
            <Route path={`${path}/callback`}>
                <CallbackRouter />
            </Route>
        </Switch>
    )
};
