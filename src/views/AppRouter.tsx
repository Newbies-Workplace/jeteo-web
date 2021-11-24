import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import { AuthRouter } from './auth';
import { HomeView } from './home';

export const AppRouter: React.FC = () => {

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <HomeView />
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