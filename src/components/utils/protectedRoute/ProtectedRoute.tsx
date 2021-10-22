import React from 'react';
import { Redirect, Route, RouteProps } from "react-router";

export const ProtectedRoute: React.FC<RouteProps> = ({ path, children, ...rest }) => {

    //todo(DiD3n):  auth hook
    const isAuth = true;

    return isAuth ? (
        <Route path={path} {...rest}>
            {children}
        </Route>
    ) : (
        <Redirect to={`/auth/login?redirect=${path}`} />
    )
}
