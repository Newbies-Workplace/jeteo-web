import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from "./EventDetails.module.scss"
import {Toolbar} from "../Toolbar/Toolbar";
import {getIdFromVanityUrl} from "../../../common/utils/vanityUrlUtils";
import {useDeleteEventMutation, useEventQuery} from "../../../api/graphql";

export const EventDetails: React.FC = () => {
    const { name } = useParams<{name: string}>()
    const [deleteEvent] = useDeleteEventMutation({
        variables: {
            id: getIdFromVanityUrl(name)
        }
    })
    const {loading, error, data} = useEventQuery({
        variables: {
            id: getIdFromVanityUrl(name)
        }
    })
    const navigate = useNavigate()
    const event = data?.event

    const onEventDeleteClicked = () => {
        deleteEvent()
            .then(() => {
                navigate(-1)
            })
            .catch(console.error)
    }

    if (loading) return <>loading...</>;
    if (error) return <p>error <br/>{error.message}</p>;

    return (
        <div className={styles.container}>
            {event && <>
                <Toolbar title={event.title} onBackPress={() => {navigate(-1)}}/>

                <div className={styles.actionBar}>
                    <Link className={styles.action} to={`/event/${event.vanityUrl}`}><b>Zobacz</b>wydarzenie</Link>
                    <Link className={styles.action} to={`/studio/events/${event.vanityUrl}/edit`}><b>Edytuj</b>wydarzenie</Link>
                    <div className={styles.action} onClick={onEventDeleteClicked}><b>Usuń</b>wydarzenie</div>
                </div>
            </>}
        </div>
    )
}