import React, { useEffect, useState} from 'react';
import { useQuery } from "@apollo/client";
import { EventCard } from "../../containers/LectureCard/EventCard";
import exampleimg from "../../../assets/images/photos/test_img1.jpg";
import {
    EventListQueryData,
    EventListQueryVars,
    GET_EVENTS_LIST_QUERY
} from "../../../api/graphql/events/EventListQuery";
import {Event} from "../../../common/models/Event";
import {Link} from "react-router-dom";
import {EventListSkeleton} from "../../loaders/Skeletons/EventListSkeleton/EventListSkeleton";
import {PlaceholderSwitcher} from "../../utils/animations/PlaceholderSwitcher";
import {AnimatedList} from "../../utils/animations/AnimatedList";


export const EventList: React.FC = () => {

    const {loading, error, data} = useQuery<EventListQueryData, EventListQueryVars>(
        GET_EVENTS_LIST_QUERY, {
        variables: {
            page: 1,
            size: 50,
        },
    });

    const [events, setEvents] = useState<React.ReactNode[]>([]);

    useEffect(() => {

        // if query doesn't return anything
        // it is better to stay current state rather than nuke list
        if (!data)
            return;

        setEvents(data.events.map(Event.fromData).map(event =>
            <Link
                key={event.id}
                style={{textDecoration: 'none'}}
                to={`/event/${event.vanityUrl}`}>
                <EventCard
                    id={event.id}
                    title={event.title}
                    subtitle={event.author.nickname}
                    startDate={event.startDate}
                    color={event.primaryColor}
                    image={ event.image || exampleimg}/>
            </Link>
        ))
    }, [data]);

    if (error)
        return <p>error <br/>{error.message}</p>;

    return (
        <PlaceholderSwitcher
            placeholder={<EventListSkeleton/>}
            loading={loading}>
            <AnimatedList items={events}/>
        </PlaceholderSwitcher>
    )
}