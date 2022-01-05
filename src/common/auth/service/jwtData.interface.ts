
export interface JwtData {
    id: string;
    nickname: string;

    exp: number; // expire
    iat: number;
    iss: string; // service name
    roles: string[],
    sub: string;
}
