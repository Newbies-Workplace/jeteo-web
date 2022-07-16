import {gql} from "@apollo/client";
import {EventData} from "./EventDataQuery";

export const CREATE_EVENT_MUTATION = gql`
    mutation event($request: EventRequestInput!) {
        createEvent(request: $request) {
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

export interface EventRequestInput {
    title: string
    subtitle?: string
    description?: string
    timeFrame: {
        startDate: string
        finishDate?: string
    }
    address?: {
        city: string
        place: string
        coordinates: {
            latitude: number
            longitude: number
        } | null
    }
    tags: {
        id: string
    }[]
}

export interface EventMutationVars {
    request: EventRequestInput
}

export interface EventMutationData {
    createEvent: EventData
}