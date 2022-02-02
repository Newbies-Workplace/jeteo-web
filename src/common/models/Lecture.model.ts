import {AgendaEntry} from "./Agenda.model";

export interface SimpleLecture {
    id: string

    name: string
    description: string

    startDate: string
    finishDate: string
}


export interface Lecture extends SimpleLecture {
    agenda?: AgendaEntry[]
}