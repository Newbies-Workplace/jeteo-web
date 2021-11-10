import React from 'react';
import { Redirect, Route, RouteProps } from "react-router";
import { useAuth } from '../../../common/auth/context/useAuth.hook';

export const ProtectedRoute: React.FC<RouteProps> = ({ path, children, ...rest }) => {
    const { user } = useAuth();

    return user ? (
        <Route path={path} {...rest}>
            {children}
        </Route>
    ) : (
        <Redirect to={`/auth/login?redirect=${path}`} />
    )
}
