import React, { useMemo } from 'react';
import { Event } from "../../../common/models/Event";
import { Link } from "react-router-dom";
import { EventListSkeleton } from "../../loaders/Skeletons/EventListSkeleton/EventListSkeleton";
import { PlaceholderSwitcher } from "../../utils/animations/PlaceholderSwitcher";
import { AnimatedList } from "../../utils/animations/AnimatedList";
import { EventCard } from "../../containers/EventCard/EventCard";
import {EventFilterInput, useEventsListQuery} from "../../../api/graphql";

export type EventListItemRenderer = (e: Event, index: number) => JSX.Element;

export interface EventListProps {
    renderItem?: EventListItemRenderer
    filter?: EventFilterInput
}

const defaultCardRenderer: EventListItemRenderer = event => (
    <Link
        key={event.id}
        style={{ textDecoration: 'none' }}
        to={`/event/${event.vanityUrl}`}>
        <EventCard
            title={event.title}
            locationName={event.location?.city}
            subtitle={event.subtitle}
            startDate={event.startDate}
            color={event.primaryColor}
            image={event.image} />
    </Link>
);

export const EventList: React.FC<EventListProps> = ({ filter, renderItem = defaultCardRenderer }) => {
    const { loading, error, data } = useEventsListQuery({
        variables: {
            page: 1,
            size: 50,
        },
    });

    const events = useMemo(
        () => data?.events
            .map(Event.fromData)
            .map(renderItem) || [],
        [data]
    );

    if (error)
        return <p>error <br />{error.message}</p>;

    return (
        <PlaceholderSwitcher
            placeholder={<EventListSkeleton />}
            loading={loading}>
            <AnimatedList items={events} />
        </PlaceholderSwitcher>
    );
};
