import {UserResponse} from "../user/UserResponse.interface";

export interface AuthResponse {
    username: string

    roles: string[]

    accessToken: string
    refreshToken: string
    tokenType: string
    expiresIn: number

    user: UserResponse

    properties: {
        isInitialized: boolean
    }
}
