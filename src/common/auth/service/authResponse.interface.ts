
export interface AuthResponse {
    username: string;
    accessToken: string;
    refreshToken: string;

    roles: string[];
    expiresIn: number;
    tokenType: string;
}
