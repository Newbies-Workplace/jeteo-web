import {SimpleUser} from "./User";
import {EventLocation} from "./EventLocation";
import {Tag} from "./Tag";
import {CoreEventResponseFragment, Visibility} from "../../api/graphql";

export class Event {
    constructor(
        public id: string,
        public title: string,
        public subtitle: string | undefined,
        public description: string | undefined,
        public vanityUrl: string,
        public author: SimpleUser,
        public startDate: Date,
        public finishDate: Date | undefined,
        public primaryColor: string | undefined,
        public image: string | undefined,
        public location: EventLocation | undefined,
        public tags: Tag[],
        public visibility: Visibility
    ) {
    }

    static fromData(data: CoreEventResponseFragment): Event {
        return new Event(
            data.id,
            data.title,
            data.subtitle,
            data.description,
            data.vanityUrl,
            data.author as SimpleUser,
            new Date(data.timeFrame.startDate),
            data.timeFrame?.finishDate ? new Date(data.timeFrame.finishDate) : undefined,
            data.theme.primaryColor,
            data.theme.image,
            data.address && EventLocation.fromData(data.address),
            data.tags.map(Tag.fromData),
            data.visibility,
        )
    }
}