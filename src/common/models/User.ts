import {UserResponse} from "../../api/rest/user/UserResponse.interface";

export interface SimpleUser {
    id: string,
    nickname: string,
}

export class User implements SimpleUser {

    constructor(
        public id: string,
        public nickname: string,
        public description?: string,
        public createDate?: Date,
        public updateDate?: Date,
    ) {
    }

    static fromData(userResponse: UserResponse): User {
        return new User(
            userResponse.id,
            userResponse.nickname,
            userResponse.description,
            new Date(userResponse.createDate),
            new Date(userResponse.updateDate),
        )
    }
}
