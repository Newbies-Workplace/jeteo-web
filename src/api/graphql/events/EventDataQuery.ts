import {gql} from "@apollo/client";

export const GET_EVENT_QUERY = gql`
    query getEvent($id: String!) {
        event(id: $id) {
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
            theme {
                primaryColor
                image
            }
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
    subtitle: string
    vanityUrl: string
    author: {
        id: string
        nickname: string
    }
    timeFrame: {
        startDate: string
    }
    theme: {
        primaryColor: string
        image: string
    }
}
