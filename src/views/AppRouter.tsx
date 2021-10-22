import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Planet from '../assets/images/planet.svg';
import { AuthRouter } from './auth';

export const AppRouter: React.FC = () => {

    return (
        <Router>
            <Switch>
                <Route path="/">
                    <Planet />
                    <p>
                        Hello universe!
                    </p>
                </Route>

                <Route path="/auth/*">
                    <AuthRouter />
                </Route>

                <Route path="*">
                    404
                </Route>
            </Switch>
        </Router>
    )
}