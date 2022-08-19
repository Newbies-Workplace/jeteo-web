import {CoreTagResponseFragment} from "../../api/graphql";

export class Tag {
    constructor(
        public id: string,
        public name: string
    ) {
    }

    static fromData(data: CoreTagResponseFragment): Tag {
        return new Tag(
            data.id,
            data.name,
        )
    }
}