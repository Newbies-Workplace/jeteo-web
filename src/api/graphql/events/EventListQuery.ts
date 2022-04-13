import {gql} from "@apollo/client";
import {EventData} from "./EventDataQuery";

export const GET_EVENTS_LIST_QUERY = gql`
    query getEventsList($page: Int, $size: Int) {
        events(page: $page, size: $size) {
            id
            title
            subtitle
            author {
                nickname
            }
            timeFrame {
                startDate
            }
            theme {
                primaryColor
                image
            }
        }
    }
`;

export interface EventListQueryVars {
    page: number,
    size: number,
}

export interface EventListQueryData {
    events: EventData[]
}
