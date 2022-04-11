import React from 'react';
import { useQuery } from "@apollo/client";
import { EventCard } from "../../containers/LectureCard/EventCard";
import exampleimg from "../../../assets/images/photos/test_img1.jpg";
import {
    EventListQueryData,
    EventListQueryVars,
    GET_EVENTS_LIST_QUERY
} from "../../../api/graphql/events/EventListQuery";
import {Event} from "../../../common/models/SimpleEvent.model";
import {Link} from "react-router-dom";


export const EventList: React.FC = () => {

    const {loading, error, data} = useQuery<EventListQueryData, EventListQueryVars>(
        GET_EVENTS_LIST_QUERY, {
        variables: {
            page: 1,
            size: 50,
        }
    });

    if (loading) return <>loading...</>;
    if (error) return <p>error <br/>{error.message}</p>;

    return (
        <div>
            {data && data.events
                .map(Event.fromData)
                .map(event =>
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
                )}
        </div>
    )
}