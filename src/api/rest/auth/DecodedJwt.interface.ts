
export interface DecodedJwt {
    id: string;
    nickname: string;

    exp: number; // expire
    iat: number;
    iss: string; // api name
    roles: string[],
    sub: string;
}
