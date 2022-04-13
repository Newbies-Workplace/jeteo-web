
export interface UserResponse {
    id: string
    nickname: string
    description?: string
    contact: {
        github?: string
        linkedin?: string
        mail?: string
        twitter?: string
    }
    createDate: string
    updateDate: string
}