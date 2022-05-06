import React from "react";

import styles from "./StudioEventList.module.scss"
import {useQuery} from "@apollo/client";
import {
    EventListQueryData,
    EventListQueryVars,
    GET_EVENTS_LIST_QUERY,
    Visibility
} from "../../../api/graphql/events/EventListQuery";
import {Event} from "../../../common/models/Event";
import {Link} from "react-router-dom";
import {EventCard} from "../../../components/containers/EventCard/EventCard";
import exampleimg from "../../../assets/images/photos/test_img1.jpg";
import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

export const StudioEventList: React.FC = () => {
    const {loading, error, data} = useQuery<EventListQueryData, EventListQueryVars>(
        GET_EVENTS_LIST_QUERY, {
            variables: {
                page: 1,
                size: 50,
                filter: {
                    visibilityIn: [Visibility.INVISIBLE, Visibility.PRIVATE, Visibility.PUBLIC]
                }
            }
        });

    if (loading) return <>loading...</>;
    if (error) return <p>error <br/>{error.message}</p>;

    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <b>Wydarzenia</b>

                <Link to={"/studio/events/create"}>
                    <PrimaryButton>Dodaj</PrimaryButton>
                </Link>
            </div>

            {data && data.events
                .map(Event.fromData)
                .map(event =>
                    <Link
                        key={event.id}
                        style={{textDecoration: 'none'}}
                        to={`/studio/events/${event.vanityUrl}`}>

                        <EventCard
                            id={event.id}
                            title={event.title}
                            subtitle={event.subtitle}
                            startDate={event.startDate}
                            color={event.primaryColor}
                            image={ event.image || exampleimg}/>
                    </Link>
                )}
        </div>
    )
}