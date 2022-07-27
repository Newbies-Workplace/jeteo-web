import {gql} from "@apollo/client";
import {CORE_EVENT_RESPONSE_FRAGMENT, EventData} from "./EventDataQuery";

export const GET_EVENTS_LIST_QUERY = gql`
    ${CORE_EVENT_RESPONSE_FRAGMENT}
    query getEventsList($page: Int, $size: Int, $filter: EventFilterInput) {
        events(page: $page, size: $size, filter: $filter) {
            ...CoreEventResponse
        }
    }
`;

export interface EventFilterInput {
    authorId?: string,
    visibilityIn?: Visibility[],
}

export enum Visibility {
    PUBLIC = "PUBLIC",
    INVISIBLE = "INVISIBLE",
    PRIVATE = "PRIVATE",
}

export interface EventListQueryVars {
    page: number,
    size: number,
    filter?: EventFilterInput,
}

export interface EventListQueryData {
    events: EventData[]
}
