import { AxiosInstance } from 'axios';
import { AuthResponse } from './authResponse.interface';

export const authByGithub = async (axios: AxiosInstance, token: string, provider: string): Promise<AuthResponse> =>
    axios.get<AuthResponse>(`/oauth/callback/${provider}?code=${token}`)
        .then(res => res.data);
