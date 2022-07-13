import React from "react";

import { EventData } from "../../../api/graphql/events/EventDataQuery";

import { EventDetailsHeadline } from "../EventDetailsHeadline/EventDetailsHeadline";

import styles from "./EventDetails.module.scss";

interface EventDetailsProps {
    event?: EventData;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
    return (
        <div className={styles.eventDetailsContainer}>
            <EventDetailsHeadline event={event} />
        </div>
    );
};

export default EventDetails;