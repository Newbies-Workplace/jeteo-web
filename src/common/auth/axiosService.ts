import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

const AXIOS_CONFIG: AxiosRequestConfig = {
    baseURL: __RESTAPI_URI__
}

export const createAxiosClient = (
    axiosConfig?: AxiosRequestConfig): AxiosInstance => {
    return axios.create({ ...axiosConfig, ...AXIOS_CONFIG});
}