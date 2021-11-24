
export interface AuthResponse {
    username: string;
    access_token: string;
    refresh_token: string;

    roles: string[];
    expires_in: number;
    token_type: string;
}
