import React from 'react';
import {useQueryParams} from "../../../common/utils/useQueryParams";

export const AuthErrorView: React.FC = () => {
    const query = useQueryParams();

    return <>{query.get("message")}</>;
}