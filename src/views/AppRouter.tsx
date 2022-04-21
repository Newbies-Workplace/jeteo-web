import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import { AuthRouter } from './auth/AuthView';
import { HomeView } from './home/HomeView';
import { EventView } from "./event/EventView";

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

                <Route
                    element={<EventView/>}
                    path="event/:name"/>


                <Route path="*">
                    404
                </Route>
            </Routes>
        </Router>
    )
}