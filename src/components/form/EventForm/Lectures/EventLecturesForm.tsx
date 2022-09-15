import React from "react";
import Button from "../../../ui/Button/Button";
import {Event} from "../../../../common/models/Event";
import formStyles from "../../Form.module.scss"
import {LectureList} from "../../../ui/LectureList/LectureList";
import {useNavigate} from "react-router-dom";
import {StudioLectureCard} from "../../../containers/StudioLectureCard/StudioLectureCard";

interface EventLecturesFormProps {
    event: Event,
    onSubmitted: (event: Event) => void
}

export const EventLecturesForm: React.FC<EventLecturesFormProps> = ({event, onSubmitted}) => {
    const navigate = useNavigate()

    return (
        <div>
            <LectureList
                filter={{eventId: event.id}}
                renderItem={ (lecture) =>
                    <StudioLectureCard
                        title={lecture.title}
                        descriptionSnippet={lecture.description?.substring(0, 50)}
                        speakers={[]}
                        onEditClick={() => navigate(`/studio/events/${event.vanityUrl}/lectures/${lecture.id}/edit`)}/>
                } />

            <div className={formStyles.submit}>
                <Button secondary onClick={() => navigate(`/studio/events/${event.vanityUrl}/lectures/create`)}>
                    Dodaj
                </Button>
                <Button onClick={() => onSubmitted(event)}>
                    Zapisz
                </Button>
            </div>
        </div>
    )
}