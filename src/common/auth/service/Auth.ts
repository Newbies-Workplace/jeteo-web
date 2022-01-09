import { AxiosInstance } from 'axios';
import { AuthResponse } from './authResponse.interface';

export const authByProvidersToken = async (axios: AxiosInstance, token: string, provider: string): Promise<AuthResponse> =>
    axios.get<AuthResponse>(`/oauth/callback/${provider}`, {
        params: {
            code: token
        }
    })
        .then(res => res.data);


export const refreshToken = (axios: AxiosInstance, refresh_token: string): Promise<AuthResponse> =>
    axios.post<AuthResponse>(`/oauth/access_token`, {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
    })
        .then(res => res.data);