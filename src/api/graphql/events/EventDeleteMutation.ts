import {gql} from "@apollo/client";

export const DELETE_EVENT_MUTATION = gql`
    mutation deleteEvent($id: String!) {
        deleteEvent(id: $id)
    }
`;

export interface EventDeleteVars {
    id: string
}