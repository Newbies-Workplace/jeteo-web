import React from 'react';
import { useParams } from "react-router-dom";

import { NavBar } from "../../components/ui/NavBar/NavBar";


export const EventView: React.FC = () => {

    const { id } = useParams<{id: string}>();

    return (
        <>
            <NavBar/>
            {id}
        </>
    )
}
