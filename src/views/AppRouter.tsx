import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import { HomeView } from './home/HomeView';
import { withSuspense } from "../components/utils/hoc/withSuspense";

const StudioView = React.lazy(() => import('./studio/StudioView'));
const AuthView = React.lazy(() => import('./auth/AuthView'));
const EventView = React.lazy(() => import('./event/EventView'));

export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route
                    element={<HomeView/>}
                    path="/"/>

                <Route
                    element={withSuspense(AuthView)}
                    path="/auth/*"/>

                <Route
                    element={withSuspense(EventView)}
                    path="event/:name"/>

                <Route
                    element={withSuspense(StudioView)}
                    path="studio/*"/>

                <Route path="*">
                    404
                </Route>
            </Routes>
        </Router>
    )
}