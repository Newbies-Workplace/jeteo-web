import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import Planet from '../assets/images/planet.svg';
import { AuthRouter } from './auth';

export const AppRouter: React.FC = () => {

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Planet />
                    <p>
                        Hello universe!
                    </p>
                    <Link to="/auth/signin">Login Page</Link>
                </Route>

                <Route path="/auth">
                    <AuthRouter />
                </Route>

                <Route path="*">
                    404
                </Route>
            </Switch>
        </Router>
    )
}