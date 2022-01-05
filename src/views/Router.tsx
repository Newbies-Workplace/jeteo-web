import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import NotFoundPage from '../pages/NotFoundPage';

import { AuthRouter } from './auth';
import HomePage from './home';

import SignupView1 from './auth/signup/SignupView1';
import SignUpView2 from './auth/signup/SignUpView2';
import SignUpView3 from './auth/signup/SignupView3';

export const Router: React.FC = () => (
    <BrowserRouter>
        <Route exact path="/auth" component={AuthRouter} />
        <Route exact path="/404" component={NotFoundPage} />
        <Route exact path="/register/1" component={SignupView1} />
        <Route exact path="/register/2" component={SignUpView2} />
        <Route exact path="/register/3" component={SignUpView3} />
        <Route exact path="/" component={HomePage} />
    </BrowserRouter>
);

export default Router;