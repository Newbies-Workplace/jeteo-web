import React from 'react';

import { useQuery } from '@apollo/client';

import { useParams, Navigate } from "react-router-dom";

import { EventDataQueryData, EventDataVars, GET_EVENT_QUERY } from '../../api/graphql/events/EventDataQuery';

import { NavBar } from "../../components/ui/NavBar/NavBar";

import EventDetails from '../../components/containers/EventDetails/EventDetails';

export const EventView: React.FC = () => {
    const { name } = useParams<{name: string}>();
    
    const id = name?.match(/[a-zA-Z0-9_]+$/)?.at(0);
    
        if (!name || !id)
            return <Navigate to="/"/>;

    const { loading, error, data } = useQuery<EventDataQueryData, EventDataVars>(
        GET_EVENT_QUERY, {
        variables: {
            id
        }
    });

    if (loading) return <>loading...</>;
    if (error) return <p>error <br/>{error.message}</p>;

    return (
        <>
            <NavBar/>
            <EventDetails event={data?.event} />
        </>
    )
};