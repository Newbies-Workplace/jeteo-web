import {gql} from "@apollo/client";
import {CORE_EVENT_RESPONSE_FRAGMENT, EventData} from "./EventDataQuery";

export const CREATE_EVENT_MUTATION = gql`
    ${CORE_EVENT_RESPONSE_FRAGMENT}
    mutation event($request: EventRequestInput!) {
        createEvent(request: $request) {
            ...CoreEventResponse
        }
    }
`;

export const REPLACE_EVENT_MUTATION = gql`
    ${CORE_EVENT_RESPONSE_FRAGMENT}
    mutation event($id: String!, $request: EventRequestInput!) {
        replaceEvent(id: $id, request: $request) {
            ...CoreEventResponse
        }
    }
`

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

export interface CreateEventMutationVars {
    request: EventRequestInput
}

export interface ReplaceEventMutationVars {
    id: string,
    request: EventRequestInput
}

export interface CreateEventMutationData {
    createEvent: EventData
}

export interface ReplaceEventMutationData {
    replaceEvent: EventData
}