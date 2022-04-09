import {AgendaEntry} from "./Agenda.model";
import {User} from "./User";

export class SimpleLecture {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public startDate: string,
        public primaryColor: string,
    ) {
    }
}

export class Lecture extends SimpleLecture {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public startDate: string,
        public finishDate: string,
        public city: string,
        public place: string,
        public latitude: number,
        public longitude: number,
        public agenda: AgendaEntry[] = [],
        public primaryColor: string,
        public author?: User,
    ) {
        super(
            id,
            name,
            description,
            startDate,
            primaryColor,
        );
    }
}
