import {gql} from "@apollo/client";
import {CORE_EVENT_RESPONSE_FRAGMENT, EventData} from "./EventDataQuery";
import {EventVisibility} from "../../../common/models/EventVisibility";

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
    visibilityIn?: EventVisibility[],
}

export interface EventListQueryVars {
    page: number,
    size: number,
    filter?: EventFilterInput,
}

export interface EventListQueryData {
    events: EventData[]
}
