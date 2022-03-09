import { FC } from "react";

import { BrowserRouter, Route } from "react-router-dom";

import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import SignIn1 from "./pages/SignIn/1/SignIn1";
import SignIn2 from "./pages/SignIn/2/SignIn2";
import SignIn3 from "./pages/SignIn/3/SignIn3";

import CallbackRouter from "./views/auth/callback/CallbackRouter";
import SignInView from "./views/auth/signin/SigninView";
import SignUpView from "./views/auth/signup/SignupView";

export const Router: FC = function() {
    return (
        <BrowserRouter>
            <Route exact path="/404" component={NotFound} />
            <Route exact path="/sign-in/1" component={SignIn1} />
            <Route exact path="/sign-in/2" component={SignIn2} />
            <Route exact path="/sign-in/3" component={SignIn3} />
            <Route exact path="/" component={Home} />
            <Route path="/callback" component={CallbackRouter} />
            <Route path="/signin" component={SignInView} />
            <Route path="/signup" component={SignUpView} />
        </BrowserRouter>
    );
};

// LAZY LOADING
// TODO: PRZYWROCIC DO VIEWS

export default Router;