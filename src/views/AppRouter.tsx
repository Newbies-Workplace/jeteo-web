import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import { AuthRouter } from './auth';
import { HomeView } from './home';

export const AppRouter: React.FC = () => {

    return (
        <Router>
            <Routes>
                <Route
                    element={<HomeView/>}
                    path="/"/>

                <Route
                    element={<AuthRouter/>}
                    path="/auth/*"/>

                <Route path="*">
                    404
                </Route>
            </Routes>
        </Router>
    )
}