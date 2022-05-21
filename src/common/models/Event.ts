import {SimpleUser} from "./User";
import {EventData} from "../../api/graphql/events/EventDataQuery";


export class Event {
    constructor(
        public id: string,
        public title: string,
        public subtitle: string,
        public vanityUrl: string,
        public author: SimpleUser,
        public startDate: Date,
        public primaryColor: string,
        public image: string,
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
            data.theme.image
        )
    }
}