import {SimpleUser} from "./User";
import {EventData} from "../../api/graphql/events/EventDataQuery";
import {EventLocation} from "./EventLocation";

export class Event {
    constructor(
        public id: string,
        public title: string,
        public subtitle: string | undefined,
        public vanityUrl: string,
        public author: SimpleUser,
        public startDate: Date,
        public primaryColor: string | undefined,
        public image: string | undefined,
        public location: EventLocation | undefined,
    ) {
    }

    static fromData(data: EventData): Event {
        return new Event(
            data.id,
            data.title,
            data.subtitle,
            data.vanityUrl,
            data.author as SimpleUser,
            new Date(data.timeFrame.startDate),
            data.theme.primaryColor,
            data.theme.image,
            data.address && EventLocation.fromData(data.address)
        )
    }
}