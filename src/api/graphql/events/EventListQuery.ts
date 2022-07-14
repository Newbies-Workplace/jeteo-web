import {gql} from "@apollo/client";
import {EventData} from "./EventDataQuery";

export const GET_EVENTS_LIST_QUERY = gql`
    query getEventsList($page: Int, $size: Int, $filter: EventFilterInput) {
        events(page: $page, size: $size, filter: $filter) {
            id
            title
            subtitle
            vanityUrl
            author {
                nickname
            }
            timeFrame {
                startDate
            }
            address {
                city
                place
            }
            theme {
                primaryColor
                image
            }
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
