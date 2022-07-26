import {gql} from "@apollo/client";
import {Visibility} from "./EventListQuery";

export const GET_EVENT_QUERY = gql`
    query getEvent($id: String!) {
        event(id: $id) {
            id
            title
            subtitle
            description
            vanityUrl
            author {
                nickname
            }
            timeFrame {
                startDate
                finishDate
            }
            theme {
                primaryColor
                image
            }
            visibility
        }
    }
`;

export interface EventQueryVars {
    id: string
}

export interface EventQueryData {
    event: EventData
}

export interface EventData {
    id: string
    title: string
    subtitle?: string
    description?: string
    vanityUrl: string
    author: {
        id: string
        nickname: string
    }
    timeFrame: {
        startDate: string
        finishDate?: string
    }
    theme: {
        primaryColor?: string
        image?: string
    }
    visibility: Visibility
}
