import React from 'react';
import { Navigate, useLocation } from "react-router";
import { useAuth } from '../../../contexts/auth/hooks/useAuth.hook';

interface RequireAuthProps {
    fallback?: JSX.Element;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({fallback, children}) => {
    const { user } = useAuth();
    const { pathname } = useLocation();

    if (user)
        return <>{children}</>;

    return fallback || <Navigate to={`/auth/signin?redirect=${pathname}`} />
}
