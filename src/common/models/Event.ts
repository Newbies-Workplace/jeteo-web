import {SimpleUser} from "./User";
import {EventLocation} from "./EventLocation";
import {Tag} from "./Tag";
import {EventResponse, EventsListQuery} from "../../api/graphql";

type event = EventsListQuery["events"];

export class Event {
    constructor(
        public id: string,
        public title: string,
        public subtitle: string | undefined,
        public description: string | undefined,
        public vanityUrl: string,
        public author: SimpleUser,
        public startDate: Date,
        public primaryColor: string | undefined,
        public image: string | undefined,
        public location: EventLocation | undefined,
        public tags: Tag[],
    ) {
    }

    static fromData(data: EventResponse): Event {
        return new Event(
            data.id,
            data.title,
            data.subtitle,
            data.description,
            data.vanityUrl,
            data.author as SimpleUser,
            new Date(data.timeFrame.startDate),
            data.theme.primaryColor,
            data.theme.image,
            data.address && EventLocation.fromData(data.address),
            data.tags.map(Tag.fromData),
        )
    }
}