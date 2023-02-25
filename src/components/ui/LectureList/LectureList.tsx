import React from "react";
import {LectureFilterInput, useLecturesListQuery} from "../../../api/graphql";
import {Lecture} from "../../../common/models/Lecture";
import {PlaceholderSwitcher} from "../../utils/animations/PlaceholderSwitcher";
import {EventListSkeleton} from "../../loaders/Skeletons/EventListSkeleton/EventListSkeleton";
import {AnimatedList} from "../../utils/animations/AnimatedList";
import {toast} from "react-toastify";

export type LectureListItemRenderer = (l: Lecture, index: number) => JSX.Element;

export interface LectureListProps {
    renderItem: LectureListItemRenderer
    filter: LectureFilterInput
}

export const LectureList: React.FC<LectureListProps> = ({filter, renderItem}) => {
    const { loading, error, data } = useLecturesListQuery({
        variables: {
            filter,
        },
        onError: () => {
            toast.error("Wystąpił błąd podczas wczytywania prelekcji")
        }
    });

    if (error)
        return <p>error <br />{error.message}</p>;

    return (
        <PlaceholderSwitcher
            placeholder={<EventListSkeleton />}
            loading={loading}>
            <AnimatedList items={
                data?.lectures
                    .map(Lecture.fromData)
                    .map((lecture, index) => renderItem(lecture, index)) || []
            } />
        </PlaceholderSwitcher>
    );
}