import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import { HomeView } from './home/HomeView';
import { withSuspense } from "../components/utils/hoc/withSuspense";
import { NotFound } from './404/NotFound';
import { HeroPage } from './hero/HeroPage';

const StudioView = React.lazy(() => import('./studio/StudioView'));
const AuthView = React.lazy(() => import('./auth/AuthView'));
const EventView = React.lazy(() => import('./event/EventView'));

export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route
                    element={<HomeView />}
                    path="/" />

                <Route
                    element={withSuspense(AuthView)}
                    path="/auth/*" />

                <Route
                    element={withSuspense(EventView)}
                    path="event/:name" />

                <Route
                    element={withSuspense(StudioView)}
                    path="studio/*" />

                <Route
                    element={<HeroPage />}
                    path="/heropage"
                />

                <Route
                    element={<NotFound />}
                    path="*"
                />
            </Routes>
        </Router>
    )
}