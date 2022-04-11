import React from 'react';

import { useParams, Navigate } from "react-router-dom";

import { NavBar } from "../../components/ui/NavBar/NavBar";


export const EventView: React.FC = () => {
    const { name } = useParams<{name: string}>();

    if (!name)
        return <Navigate to="/"/>;

    const id = name?.match(/[a-zA-Z0-9_]+$/)?.at(0);

    return (
        <>
            <NavBar/>
            {id ? id : 'idk'}
        </>
    )
}
