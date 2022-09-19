import React, {useMemo} from "react";
import {LectureFilterInput, useLecturesListQuery} from "../../../api/graphql";
import {Lecture} from "../../../common/models/Lecture";
import {PlaceholderSwitcher} from "../../utils/animations/PlaceholderSwitcher";
import {EventListSkeleton} from "../../loaders/Skeletons/EventListSkeleton/EventListSkeleton";
import {AnimatedList} from "../../utils/animations/AnimatedList";
import {StudioLectureCard} from "../../containers/StudioLectureCard/StudioLectureCard";

export type LectureListItemRenderer = (l: Lecture, index: number) => JSX.Element;

export interface LectureListProps {
    renderItem?: LectureListItemRenderer
    filter: LectureFilterInput
}

const defaultCardRenderer: LectureListItemRenderer = (lecture) => (
    <StudioLectureCard
        title={lecture.title}
        descriptionSnippet={lecture.description?.substring(0, 50)}
        speakers={[]}/>
)

export const LectureList: React.FC<LectureListProps> = ({filter, renderItem = defaultCardRenderer}) => {
    const { loading, error, data } = useLecturesListQuery({
        variables: {
            filter,
        },
    });

    const lectures = useMemo(
        () => data?.lectures
            .map(Lecture.fromData)
            .map((lecture, index) => renderItem(lecture, index)) || [],
        [data]
    );

    if (error)
        return <p>error <br />{error.message}</p>;

    return (
        <PlaceholderSwitcher
            placeholder={<EventListSkeleton />}
            loading={loading}>
            <AnimatedList items={lectures} />
        </PlaceholderSwitcher>
    );
}