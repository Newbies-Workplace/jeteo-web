import {gql} from "@apollo/client";

export const GET_TAG_LIST_QUERY = gql`
    query getTagList($page: Int, $size: Int) {
        tags(page: $page, size: $size) {
            id
            name
        }
    }
`

export interface TagData {
    id: string
    name: string
}

export interface TagListQueryVars {
    page: number,
    size: number,
}

export interface TagListQueryData {
    tags: TagData[]
}