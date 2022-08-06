import {TagData} from "../../api/graphql/tags/TagListQuery";

export class Tag {
    constructor(
        public id: string,
        public name: string
    ) {
    }

    static fromData(data: TagData): Tag {
        return new Tag(
            data.id,
            data.name,
        )
    }
}