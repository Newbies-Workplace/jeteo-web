import React from 'react';
import { Redirect, Route, RouteProps } from "react-router";
import { useAuth } from '../../../common/auth/useAuth.hook';

interface ProtectedRouteProps extends RouteProps {
    fallback?: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, fallback, ...rest }) => {
    const { user } = useAuth();

    return user ? (
        <Route path={path} {...rest} />
    ) : (
        fallback || <Redirect to={`/auth/login?redirect=${path}`} />
    )
}
