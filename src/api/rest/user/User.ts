import { AxiosInstance } from "axios";
import { UserResponse } from "./UserResponse.interface";
import { FileResponse } from '../event/FileResponse.interface'

export const getMe = (axios: AxiosInstance): Promise<UserResponse> =>
    axios.get<UserResponse>('/api/v1/users/@me')
        .then(res => res.data);

export const getById = (axios: AxiosInstance, id: string): Promise<UserResponse> =>
    axios.get<UserResponse>(`/api/v1/users/${id}`)
        .then(res => res.data);

export const deleteProfilePic = (axios: AxiosInstance, id: string): Promise<void> =>
    axios.delete(`/api/v1/users/@me/avatar`)

export const updateProfilePic = (axios: AxiosInstance, file: File): Promise<FileResponse> => {
    const data = new FormData()
    data.append(file.name, file)

    return axios.put<FileResponse>(`/api/v1/users/@me/avatar`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => res.data)
}