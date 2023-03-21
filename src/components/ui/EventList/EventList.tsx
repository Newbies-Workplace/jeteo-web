import React from 'react';
import {Event} from "../../../common/models/Event";
import {EventListSkeleton} from "../../loaders/Skeletons/EventListSkeleton/EventListSkeleton";
import {PlaceholderSwitcher} from "../../utils/animations/PlaceholderSwitcher";
import {AnimatedList} from "../../utils/animations/AnimatedList";
import {EventCard} from "../../containers/EventCard/EventCard";
import {EventFilterInput, useEventsListQuery} from "../../../api/graphql";

export type EventListItemRenderer = (e: Event, index: number) => JSX.Element;

export interface EventListProps {
    renderItem?: EventListItemRenderer
    filter?: EventFilterInput
}

const defaultCardRenderer: EventListItemRenderer = event => (
        <EventCard
            title={event.title}
            locationName={event.location?.place}
            subtitle={event.subtitle}
            startDate={event.startDate}
            finishDate={event.finishDate}
            color={event.primaryColor}
            image={event.image} 
            link={`/event/${event.vanityUrl}`}
            tags={event.tags}
            /> 
);

export const EventList: React.FC<EventListProps> = ({ filter, renderItem = defaultCardRenderer }) => {
    const { loading, error, data } = useEventsListQuery({
        variables: {
            page: 1,
            size: 50,
            filter,
        },
    });

    if (error)
        return <p>error <br />{error.message}</p>;

    return (
        <PlaceholderSwitcher
            placeholder={<EventListSkeleton />}
            loading={loading}>
            <AnimatedList
                items={
                    data?.events
                        ?.map(Event.fromData)
                        ?.map(renderItem) || []
                } />
        </PlaceholderSwitcher>
    );
};
