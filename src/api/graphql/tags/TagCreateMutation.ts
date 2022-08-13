import {gql} from "@apollo/client";
import {TagData} from "./TagListQuery";

export const CREATE_TAG_MUTATION = gql`
    mutation tag($request: TagCreateRequestInput!) {
        createTag(request: $request) {
            id
            name
        }
    }
`

export interface TagCreateRequestInput {
    name: string
}

export interface CreateTagMutationVars {
    request: TagCreateRequestInput
}

export interface CreateTagMutationData {
    createTag: TagData
}