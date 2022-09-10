import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import { AuthView } from './auth/AuthView';
import { HomeView } from './home/HomeView';
import { EventView } from "./event/EventView";
import { StudioView } from "./studio/StudioView";

export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route
                    element={<HomeView/>}
                    path="/"/>

                <Route
                    element={<AuthView/>}
                    path="/auth/*"/>

                <Route
                    element={<EventView/>}
                    path="event/:name"/>

                <Route
                    element={<StudioView/>}
                    path="studio/*"/>

                <Route path="*">
                    404
                </Route>
            </Routes>
        </Router>
    )
}