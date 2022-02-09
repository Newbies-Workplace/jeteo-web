import React, {createContext} from 'react';
import {Lecture, SimpleLecture} from "../models/Lecture.model";
import {fetchLectureById} from "./service/Lectures";
import axios from "axios";
import {NetworkResource, ResourceStatus} from "../NetworkResource";

interface LecturesContextInterface {
    lectures: LecturesContextInterface[]

    get(id: string): NetworkResource<Lecture>
    getPage(page: number, limit: number): NetworkResource<SimpleLecture[]>
}
const defaultLectureContext: LecturesContextInterface = {
    lectures: [],

    get: () => ResourceStatus.Error,
    getPage: () => ResourceStatus.Error,
}

export const LecturesContext = createContext<LecturesContextInterface>(defaultLectureContext);

export const LectureProvider: React.FC = ({/* axios ,*/ children}) => {


    const getLecture = (id: string): NetworkResource<Lecture> => {

        if (id) {
            fetchLectureById(axios, id)
                .catch(console.error)
        }

        return ResourceStatus.Pending;
    }

    return (
        <LecturesContext.Provider
            value={defaultLectureContext}
        >
            {children}
        </LecturesContext.Provider>
    )
}