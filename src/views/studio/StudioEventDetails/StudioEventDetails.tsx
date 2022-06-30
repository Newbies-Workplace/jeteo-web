import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from "./StudioEventDetails.module.scss"
import {StudioToolbar} from "../StudioToolbar/StudioToolbar";
import {useMutation, useQuery} from "@apollo/client";
import {EventQueryData, EventQueryVars, GET_EVENT_QUERY} from "../../../api/graphql/events/EventDataQuery";
import {getIdFromVanityUrl} from "../../../common/utils/vanityUrlUtils";
import {DELETE_EVENT_MUTATION, EventDeleteVars} from "../../../api/graphql/events/EventDeleteMutation";

export const StudioEventDetails: React.FC = () => {
    const { name } = useParams<{name: string}>()
    const [deleteEvent] = useMutation<void, EventDeleteVars>(
        DELETE_EVENT_MUTATION, {
            variables: {
                id: getIdFromVanityUrl(name)
            }
        })
    const {loading, error, data} = useQuery<EventQueryData, EventQueryVars>(
        GET_EVENT_QUERY, {
            variables: {
                id: getIdFromVanityUrl(name)
            }
        }
    )
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
                <StudioToolbar title={event.title} onBackPress={() => {navigate(-1)}}/>

                <div className={styles.actionBar}>
                    <Link className={styles.action} to={`/event/${event.vanityUrl}`}><b>Zobacz</b>wydarzenie</Link>
                    <Link className={styles.action} to={`/studio/events/${event.vanityUrl}/edit`}><b>Edytuj</b>wydarzenie</Link>
                    <div className={styles.action} onClick={onEventDeleteClicked}><b>Usuń</b>wydarzenie</div>
                </div>
            </>}
        </div>
    )
}