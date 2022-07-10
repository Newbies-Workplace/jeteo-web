import {EventLocationData} from "../../api/graphql/events/EventDataQuery";

export class EventLocation {

    constructor(
        public place: string,
        public city: string,
        public latitude?: number,
        public longitude?: number
    ) {
    }

    static fromData(data: EventLocationData): EventLocation {
        return new EventLocation(
            data.place,
            data.city
        )
    }
}