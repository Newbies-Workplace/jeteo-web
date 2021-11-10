
export interface SimpleUser {
    id: string,
    nickname: string,
}

export interface User {
    id: string,
    nickname: string,
    tags: string[],
    createAt: number,
}
