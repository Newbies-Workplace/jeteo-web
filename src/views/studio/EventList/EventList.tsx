import React from "react";
import styles from "./EventList.module.scss"
import {Link} from "react-router-dom";
import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";
import {EventList as EventListComponent} from "../../../components/ui/EventList/EventList";
import {EventCard} from "../../../components/containers/EventCard/EventCard";
import {useAuth} from "../../../contexts/auth/hooks/useAuth.hook";
import {EventFilterInput, Visibility} from "../../../api/graphql";

export const EventList: React.FC = () => {
    const {user} = useAuth()

    const EVENT_LIST_FILTER: EventFilterInput = {
        visibilityIn: [EventVisibility.INVISIBLE, EventVisibility.PRIVATE, EventVisibility.PUBLIC],
        authorId: user?.id,
    }

    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <b>Wydarzenia</b>

                <Link to={"/studio/events/create"}>
                    <PrimaryButton>Dodaj</PrimaryButton>
                </Link>
            </div>

            <EventListComponent
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