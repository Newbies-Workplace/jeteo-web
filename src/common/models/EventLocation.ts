import {AddressResponse} from "../../api/graphql";

export class EventLocation {

    constructor(
        public place: string,
        public latitude?: number,
        public longitude?: number
    ) {
    }

    static fromData(data: AddressResponse): EventLocation {
        return new EventLocation(
            data.place,
            data.coordinates?.latitude,
            data.coordinates?.longitude,
        )
    }
}