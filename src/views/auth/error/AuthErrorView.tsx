import React from 'react';
import {useQuery} from "../../../common/utils/useQuery";

export const AuthErrorView: React.FC = () => {
    const query = useQuery();

    return <>{query.get("message")}</>;
}