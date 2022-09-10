import {AxiosInstance} from "axios";
import {FileResponse} from "./FileResponse.interface";

export const deleteImage = (axios: AxiosInstance, id: string): Promise<void> =>
    axios.delete(`/api/v1/events/${id}/theme/image`)

export const updateImage = (axios: AxiosInstance, id: string, file: File): Promise<FileResponse> => {
    const data = new FormData()
    data.append(file.name, file)

    return axios.put<FileResponse>(`/api/v1/events/${id}/theme/image`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => res.data)
}