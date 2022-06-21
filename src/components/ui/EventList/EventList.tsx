import React, { useMemo } from 'react';
import { useQuery } from "@apollo/client";
import { EventCard } from "../../containers/EventCard/EventCard";
import exampleimg from "../../../assets/images/photos/test_img1.jpg";
import {
    EventFilterInput,
    EventListQueryData,
    EventListQueryVars,
    GET_EVENTS_LIST_QUERY
} from "../../../api/graphql/events/EventListQuery";
import { Event } from "../../../common/models/Event";
import { Link } from "react-router-dom";
import { EventListSkeleton } from "../../loaders/Skeletons/EventListSkeleton/EventListSkeleton";
import { PlaceholderSwitcher } from "../../utils/animations/PlaceholderSwitcher";
import { AnimatedList } from "../../utils/animations/AnimatedList";

export interface EventListProps {
    page?: number
    size?: number
    filter?: EventFilterInput
}

export const EventList: React.FC<EventListProps> = ({ page, size, filter }) => {

    const { loading, error, data } = useQuery<EventListQueryData, EventListQueryVars>(
        GET_EVENTS_LIST_QUERY, {
        variables: {
            // eslint workaround
            page: page || 1,
            size: size || 50,
            filter,
        },
    });

    const events = useMemo(
        () => data?.events
            .map(Event.fromData)
            .map(event =>
                <Link
                    key={event.id}
                    style={{ textDecoration: 'none' }}
                    to={`/event/${event.vanityUrl}`}>
                    <EventCard
                        id={event.id}
                        title={event.title}
                        subtitle={event.author.nickname}
                        startDate={event.startDate}
                        color={event.primaryColor}
                        image={event.image || exampleimg} />
                </Link>
            ) || [],
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
    )
};

EventList.defaultProps = {
    page: 1,
    size: 50,
};
