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
            address {
                place,
                city
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

export interface EventLocationData {
    place: string
    city: string
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
    address: EventLocationData
    theme: {
        primaryColor: string
        image: string
    }
}
