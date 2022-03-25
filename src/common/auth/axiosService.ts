import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

const AXIOS_CONFIG: AxiosRequestConfig = {
    baseURL: process.env.API_URL
}

export const createAxiosClient = (
    axiosConfig?: AxiosRequestConfig): AxiosInstance => {
    return axios.create({ ...axiosConfig, ...AXIOS_CONFIG});
}