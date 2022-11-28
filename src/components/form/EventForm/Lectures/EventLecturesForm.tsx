import React from "react";
import Button from "../../../ui/Button/Button";
import {Event} from "../../../../common/models/Event";
import formStyles from "../../Form.module.scss"
import {LectureList} from "../../../ui/LectureList/LectureList";
import {useNavigate} from "react-router-dom";
import {StudioLectureCard} from "../../../containers/StudioLectureCard/StudioLectureCard";
import {useDeleteLectureMutation} from "../../../../api/graphql";
import {Lecture} from "../../../../common/models/Lecture";
import {toast} from "react-toastify";

interface EventLecturesFormProps {
    event: Event,
    onSubmitted: (event: Event) => void
}

export const EventLecturesForm: React.FC<EventLecturesFormProps> = ({event, onSubmitted}) => {
    const navigate = useNavigate()
    const [deleteLecture] = useDeleteLectureMutation()

    const onDeleteLectureClick = (lecture: Lecture) => {
        deleteLecture({variables: {id: lecture.id}})
            .then()
            .then(() => toast.success("Prelekcja usunięta"))
            .catch(() => toast.error("Wystąpił błąd"))
    }

    return (
        <div>
            <LectureList
                filter={{eventId: event.id}}
                renderItem={(lecture) =>
                    <StudioLectureCard
                        title={lecture.title}
                        descriptionSnippet={lecture.description?.substring(0, 50)}
                        startDate={lecture.startDate}
                        finishDate={lecture.finishDate}
                        speakers={[]}
                        onEditClick={() => navigate(`/studio/events/${event.vanityUrl}/lectures/${lecture.id}/edit`)}
                        onDeleteClick={() => onDeleteLectureClick(lecture)}/>
                } />

            <div className={formStyles.submit}>
                <Button onClick={() => navigate(`/studio/events/${event.vanityUrl}/lectures/create`)}>
                    Dodaj
                </Button>
                <Button primary onClick={() => onSubmitted(event)}>
                    Dalej
                </Button>
            </div>
        </div>
    )
}