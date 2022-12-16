import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from "./EventDetails.module.scss"
import {Toolbar} from "../Toolbar/Toolbar";
import {getIdFromVanityUrl} from "../../../common/utils/vanityUrlUtils";
import {useDeleteEventMutation, useDeleteLectureMutation, useEventQuery} from "../../../api/graphql";
import { StudioLectureCard } from "../../../components/containers/StudioLectureCard/StudioLectureCard";
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
                navigate(-1)
            })
            .catch(console.error)
    }

    const onDeleteLectureClick = (lecture: Lecture) => {
        deleteLecture({variables: {id: lecture.id}})
            .then()
            .then(() => toast.success("Prelekcja usunięta"))
            .catch(() => toast.error("Wystąpił błąd"))
    }

    if (loading || !data ) return <>loading...</>;
    if (error) return <p>error <br/>{error.message}</p>;

    const {event, lectures} = data;

    return (
        <div className={styles.container}>
            {event && <>
                <Toolbar title={event.title} onBackPress={() => {navigate(-1)}}/>

                <div className={styles.actionBar}>
                    <Link className={styles.action} to={`/event/${event.vanityUrl}`}><b>Zobacz</b>wydarzenie</Link>
                    <Link className={styles.action} to={`/studio/events/${event.vanityUrl}/edit`}><b>Edytuj</b>wydarzenie</Link>
                    <div className={styles.action} onClick={onEventDeleteClicked}><b>Usuń</b>wydarzenie</div>
                </div>
                <div>
                    {lectures.map(lecture => Lecture.fromData(lecture)).map(lecture => 
                        <StudioLectureCard
                        title={lecture.title}
                        descriptionSnippet={lecture.description?.substring(0, 50)}
                        startDate={lecture.startDate}
                        finishDate={lecture.finishDate}
                        speakers={[]}
                        onEditClick={() => navigate(`/studio/events/${event.vanityUrl}/lectures/${lecture.id}/edit`)}
                        onClick={() => navigate(`/studio/events/${event.vanityUrl}/lectures/${lecture.id}/`)} 
                        onDeleteClick={() => onDeleteLectureClick(lecture)}
                        />
                    )}
                </div>
            </>}
        </div>
    )
}