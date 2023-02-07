import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import { HomeView } from './home/HomeView';
import { withSuspense } from "../components/utils/hoc/withSuspense";
import { NotFound } from './404/NotFound';
import { HeroView } from './hero/HeroView';
import { EventSkeleton } from '../components/loaders/Skeletons/EventDetailsSkeleton/EventSkeleton';
import { NavBar } from '../components/ui/NavBar/NavBar';
import { UserOptions } from './studio/UserOptions/UserOptions';
import { RequireAuth } from '../components/utils/requireAuth/RequireAuth';


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
                    element={withSuspense(EventView,
                    <>
                        <NavBar />
                        <EventSkeleton />
                    </>
                    )}
                    path="event/:name" />

                <Route
                    element={withSuspense(StudioView)}
                    path="studio/*" />

                <Route
                    element={<HeroView />}
                    path="/hero"
                />
                <Route
                    element={<RequireAuth><UserOptions /></RequireAuth>}
                    path="/options/*"
                />

                <Route
                    element={<NotFound />}
                    path="*"
                />
            </Routes>
        </Router>
    )
}