import {CoreLectureResponseFragment} from "../../api/graphql";

export class Lecture {
    constructor(
        public id: string,
        public title: string,
        public description: string | undefined,
        public startDate: Date,
        public finishDate: Date | undefined,
    ) {
    }

    static fromData(data: CoreLectureResponseFragment): Lecture {
        return new Lecture(
            data.id,
            data.title,
            data.description,
            new Date(data.timeFrame.startDate),
            data.timeFrame.finishDate ? new Date(data.timeFrame.finishDate) : undefined,
        )
    }
}