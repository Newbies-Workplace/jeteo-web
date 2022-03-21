import { AxiosInstance } from 'axios';
import { AuthResponse } from './authResponse.interface';

export const authByProvidersToken = async (axios: AxiosInstance, provider: string, token: string, state?: string): Promise<AuthResponse> =>
    axios.get<AuthResponse>(`/oauth/callback/${provider}`, {
        params: {
            code: token,
            state,
        }
    })
        .then(res => res.data);


export const refreshToken = (axios: AxiosInstance, refresh_token: string): Promise<AuthResponse> =>
    axios.post<AuthResponse>(`/api/v1/refresh`, refresh_token)
        .then(res => res.data);