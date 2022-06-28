import React from "react";

import styles from "./StudioEventList.module.scss"
import {
    EventFilterInput,
    Visibility
} from "../../../api/graphql/events/EventListQuery";
import {Link} from "react-router-dom";
import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";
import {EventList} from "../../../components/ui/EventList/EventList";
import {EventCard} from "../../../components/containers/EventCard/EventCard";

const EVENT_LIST_FILTER: EventFilterInput = {
    visibilityIn: [Visibility.INVISIBLE, Visibility.PRIVATE, Visibility.PUBLIC]
}

export const StudioEventList: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <b>Wydarzenia</b>

                <Link to={"/studio/events/create"}>
                    <PrimaryButton>Dodaj</PrimaryButton>
                </Link>
            </div>

            <EventList
                filter={EVENT_LIST_FILTER}
                renderItem={ event =>
                    <Link
                        key={event.id}
                        style={{ textDecoration: 'none' }}
                        to={`/studio/events/${event.id}`}>
                        <EventCard
                            title={event.title}
                            subtitle={event.author.nickname}
                            startDate={event.startDate}
                            color={event.primaryColor}
                            image={event.image} />
                    </Link>
                }
            />
        </div>
    )
}