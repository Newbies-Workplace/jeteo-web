import Axios, {AxiosInstance} from 'axios';
import {Lecture, SimpleLecture} from "../../models/Lecture.model";

export const fetchLecturesList = async (axios: AxiosInstance, page: number, limit: number) =>
    axios.get<SimpleLecture[]>('/api/v1/lectures', {
        params: {
            page, limit
        }
    })
        .then(res => res.data);

export const fetchLectureById = async (axios: AxiosInstance, id: string) =>
    axios.get<Lecture>(`/api/v1/lecture/${id}`)
        .then(res => res.data);
