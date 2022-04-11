import {gql} from "@apollo/client";

export const GET_EVENT_QUERY = gql`
    query getEvent($id: String!) {
        event(id: $id) {
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

export interface EventData {
    id: string
    title: string
    subtitle: string
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
