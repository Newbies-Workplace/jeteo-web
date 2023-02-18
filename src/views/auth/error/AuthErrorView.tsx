import React from 'react';
import {useQueryParamsHook} from "../../../contexts/auth/hooks/useQueryParams.hook";

export const AuthErrorView: React.FC = () => {
    const { message } = useQueryParamsHook();

    return <>{(message || "").toString()}</>;
}