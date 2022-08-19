import {AddressResponse} from "../../api/graphql";

export class EventLocation {

    constructor(
        public place: string,
        public city: string,
        public latitude?: number,
        public longitude?: number
    ) {
    }

    static fromData(data: AddressResponse): EventLocation {
        return new EventLocation(
            data.place,
            data.city,
            data.coordinates?.latitude,
            data.coordinates?.longitude,
        )
    }
}