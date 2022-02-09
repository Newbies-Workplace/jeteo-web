import { FC } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import NotFound from './pages/NotFound';
import Home from './pages/Home';
import SignIn1 from './pages/SignIn/1';
import SignIn2 from './pages/SignIn/2';
import SignIn3 from './pages/SignIn/3';

export const Router: FC = function() {
    return (
        <BrowserRouter>
            <Route exact path="/404" component={NotFound} />
            <Route exact path="/sign-in/1" component={SignIn1} />
            <Route exact path="/sign-in/2" component={SignIn2} />
            <Route exact path="/sign-in/3" component={SignIn3} />
            <Route exact path="/" component={Home} />
        </BrowserRouter>
    );
};

export default Router;