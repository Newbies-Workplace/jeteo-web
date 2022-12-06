import React from 'react';
import { useParams, Navigate } from "react-router-dom";
import { EventHeadline } from "../../components/containers/EventHeadline/EventHeadline";
import { NavBar } from "../../components/ui/NavBar/NavBar";
import { getIdFromVanityUrl } from "../../common/utils/vanityUrlUtils";
import {EventDescriptionSection} from "../../components/containers/EventDescriptionSection/EventDescriptionSection";
import {useEventQuery} from "../../api/graphql";
import { CentredContainer } from "../../components/primitives/CenteredContainers";

import styles from './EventView.module.scss';
import EventTags from '../../components/ui/EventTags/EventTags';

export const EventView: React.FC = () => {
    const { name } = useParams<{name: string}>();
    if (!name)
        return <Navigate to="/"/>;

    const {data, loading, error} = useEventQuery({
        variables: {id: getIdFromVanityUrl(name) }
    })


    if (error)
        return <>
            <NavBar/>
            <i>error: {error.message}</i>
        </>

    if (loading || !data?.event)
        return <>
            <NavBar/>
            <i>loading</i>
        </>

    const { event } = data;
    console.log(event.tags[0])

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <NavBar/>
            </div>
            <EventHeadline
                title={event.title}
                subtitle={event.subtitle || ""}
                image={event.theme.image}
                color={event.theme.primaryColor} />
            <div className={styles.content}>
                <CentredContainer>

                    <EventDescriptionSection
                        description={event.description || ""}/>
            <EventTags tags={ event.tags} />
                </CentredContainer>
            </div>
        </div>
    )
};

export default EventView;