import {gql} from "@apollo/client";
import {CORE_EVENT_RESPONSE_FRAGMENT, EventData} from "./EventDataQuery";
import {Visibility} from "./EventListQuery";

export const CHANGE_EVENT_VISIBILITY_MUTATION = gql`
    ${CORE_EVENT_RESPONSE_FRAGMENT}
    mutation changeEventVisibility($id: String!, $request: EventVisibilityRequestInput!) {
        changeEventVisibility(id: $id, request: $request) {
            ...CoreEventResponse
        }
    }
`;

export interface EventVisibilityRequestInput {
    visibility: Visibility
}

export interface EventChangeVisibilityData {
    changeEventVisibility: EventData
}

export interface EventChangeVisibilityVars {
    id: string
    request: EventVisibilityRequestInput
}