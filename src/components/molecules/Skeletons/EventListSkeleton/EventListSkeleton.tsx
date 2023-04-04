import React from "react";
import {EventCardSkeleton} from "../EventCardSkeleton/EventCardSkeleton";

export const EventListSkeleton: React.FC = () => (
    <>
        <EventCardSkeleton opacity={1}/>
        <EventCardSkeleton opacity={.7}/>
        <EventCardSkeleton opacity={.4}/>
    </>
);
