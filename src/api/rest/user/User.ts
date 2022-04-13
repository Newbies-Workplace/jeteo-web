import {AxiosInstance} from "axios";
import {UserResponse} from "./UserResponse.interface";

export const getMe = (axios: AxiosInstance): Promise<UserResponse> =>
    axios.get<UserResponse>('/api/v1/users/@me')
        .then(res => res.data);

export const getById = (axios: AxiosInstance, id: string): Promise<UserResponse> =>
    axios.get<UserResponse>(`/api/v1/users/${id}`)
        .then(res => res.data);