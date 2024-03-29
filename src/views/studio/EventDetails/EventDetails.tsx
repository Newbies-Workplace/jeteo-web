import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from "./EventDetails.module.scss"
import {Toolbar} from "../../../components/atoms/Toolbar/Toolbar";
import {getIdFromVanityUrl} from "../../../common/utils/vanityUrlUtils";
import {useDeleteEventMutation, useDeleteLectureMutation, useEventQuery} from "../../../api/graphql";
import { StudioLectureCard } from "../../../components/molecules/StudioLectureCard/StudioLectureCard";
import { Lecture } from "../../../common/models/Lecture";
import { toast } from "react-toastify";

export const EventDetails: React.FC = () => {
    const { name } = useParams<{name: string}>()
    const [deleteEvent] = useDeleteEventMutation({
        variables: {
            id: getIdFromVanityUrl(name)
        }
    })
    const navigate = useNavigate()
    const [deleteLecture] = useDeleteLectureMutation()

    const {loading, error, data} = useEventQuery({
        variables: {
            id: getIdFromVanityUrl(name)
        }
    })

    const onEventDeleteClicked = () => {
        deleteEvent()
            .then(() => {
                navigate('/studio/events')
            })
            .catch((e) => {
                toast.error("Wystąpił błąd")
                console.error(e)
            })
    }

    const onDeleteLectureClick = (lecture: Lecture) => {
        deleteLecture({variables: {id: lecture.id}})
            .then(() => toast.success("Prelekcja usunięta"))
            .catch(() => toast.error("Wystąpił błąd"))
    }

    if (loading || !data) return <>loading...</>;
    if (error) return <p>error <br/>{error.message}</p>;

    const {event, lectures} = data;

    return (
        <div className={styles.container}>
            {event && <>
                <Toolbar title={event.title} onBackPress={() => {navigate('/studio/events')}}/>

                <div className={styles.actionBar}>
                    <Link className={styles.action} to={`/event/${event.vanityUrl}`}><b>Zobacz</b>wydarzenie</Link>
                    <Link className={styles.action} to={`/studio/events/edit/${event.vanityUrl}/basic`}><b>Edytuj</b>wydarzenie</Link>
                    <div className={styles.action} onClick={onEventDeleteClicked}><b>Usuń</b>wydarzenie</div>
                </div>
                <div>
                    {lectures.map(lecture => Lecture.fromData(lecture)).map(lecture =>
                        <StudioLectureCard
                            key={lecture.id}
                            title={lecture.title}
                            descriptionSnippet={lecture.description?.substring(0, 50)}
                            startDate={lecture.startDate}
                            finishDate={lecture.finishDate}
                            speakers={[]}
                            onEditClick={() => navigate(`/studio/events/edit/${event.vanityUrl}/lectures/edit/${lecture.id}/basic`)}
                            onClick={() => navigate(`/studio/events/${event.vanityUrl}/lectures/${lecture.id}/review`)}
                            onDeleteClick={() => onDeleteLectureClick(lecture)}
                        />
                    )}
                </div>
            </>}
        </div>
    )
}