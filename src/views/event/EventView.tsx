import React from 'react';
import { useParams, Navigate } from "react-router-dom";

import { useEvent } from "../../hooks/events/useEvent";
import { EventHeadline } from "../../components/containers/EventHeadline/EventHeadline";
import { NavBar } from "../../components/ui/NavBar/NavBar";
import { getIdFromVanityUrl } from "../../common/utils/vanityUrlUtils";
import {EventDescriptionSection} from "../../components/containers/EventDescriptionSection/EventDescriptionSection";
import {useEventQuery} from "../../api/graphql";


export const EventView: React.FC = () => {
    const { name } = useParams<{name: string}>();
    if (!name)
        return <Navigate to="/"/>;

    const {data, loading, error} = useEventQuery({
        variables: {id: getIdFromVanityUrl(name) }
    })


    if (error)
        return <>
            <NavBar/>
            <i>error: {error.message}</i>
        </>

    if (loading || !data?.event)
        return <>
            <NavBar/>
            <i>loading</i>
        </>

    const { event } = data;

    return (
        <>
            <NavBar/>
            <EventHeadline
                title={event.title}
                subtitle={event.subtitle || ""}
                image={event.theme.image}
                color={event.theme.primaryColor} />
            <EventDescriptionSection
                description={event.description || ""}/>
        </>
    )
};
