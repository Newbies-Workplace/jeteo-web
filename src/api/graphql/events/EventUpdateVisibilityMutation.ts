import {gql} from "@apollo/client";
import {EventData} from "./EventDataQuery";
import {Visibility} from "./EventListQuery";

export const CHANGE_EVENT_VISIBILITY_MUTATION = gql`
    mutation changeEventVisibility($id: String!, $request: EventVisibilityRequestInput!) {
        changeEventVisibility(id: $id, request: $request) {
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