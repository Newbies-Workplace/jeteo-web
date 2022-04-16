import React, {useEffect, useState} from 'react';
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
import {animated, useTransition, config, useSpringRef, useChain} from "react-spring";
import {EventListSkeleton} from "../../loaders/Skeletons/EventListSkeleton/EventListSkeleton";


export const EventList: React.FC = () => {

    const [events, setEvents] = useState<Event[]>([]);

    const {loading, error, data} = useQuery<EventListQueryData, EventListQueryVars>(
        GET_EVENTS_LIST_QUERY, {
        variables: {
            page: 1,
            size: 50,
        },
    });

    useEffect(() => {
        setEvents(data?.events?.map(Event.fromData) || [])
    }, [loading])

    const smoothListTransitionRef = useSpringRef();
    const smoothListTransition = useTransition(events, {
        ref: smoothListTransitionRef,
        trail: 25,
        from: { opacity: 0.1 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: config.gentle,
    });

    const loaderTransitionRef = useSpringRef();
    const loaderTransition = useTransition(loading, {
        ref: loaderTransitionRef,
        from: { opacity: 1 },
        to: { opacity: 1},
        leave: {opacity: 0},
    });

    useChain([loaderTransitionRef, smoothListTransitionRef]);

    // if (loading)
    //     return <EventListSkeleton/>;

    if (error)
        return <p>error <br/>{error.message}</p>;

    return (
        <div style={{position: "relative"}}>
            {loaderTransition(({ opacity }, loading) =>
            loading ? (
                <animated.div
                    style={{
                        width: '100%',
                        position: 'absolute',
                        opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
                    }}>
                    <EventListSkeleton/>
                </animated.div>
            ) : (
                <animated.div
                    style={{
                        width: '100%',
                        position: 'absolute',
                        opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
                    }}>
                    {smoothListTransition((style, event) =>
                        <animated.div
                            style={style}>
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
                        </animated.div>
                    )}
                </animated.div>
            )
            )}
        </div>
    )
}