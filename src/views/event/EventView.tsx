import React from 'react';
import { useParams, Navigate } from "react-router-dom";
import { EventBackground } from "../../components/containers/EventBackground/EventBackground";
import { NavBar } from "../../components/ui/NavBar/NavBar";
import { getIdFromVanityUrl } from "../../common/utils/vanityUrlUtils";
import {EventDescriptionSection} from "../../components/containers/EventDescriptionSection/EventDescriptionSection";
import {useEventQuery} from "../../api/graphql";
import { CentredContainer } from "../../components/primitives/CenteredContainers";

import styles from './EventView.module.scss';
import EventTags from '../../components/ui/EventTags/EventTags';
import { EventHeadline } from '../../components/ui/EventHeadline/EventHeadline';
import dayjs from 'dayjs';
import Lecture from '../../components/ui/Lecture/Lecture';

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

    const { event, lectures } = data;

    const tags = event.tags.map(el =>( 
            el.name
    ))


    console.log(lectures);
    
    const lecturesList = lectures.map(item => (
        <Lecture title={item.title} description={item.description} speaker={{
            name: item.author.nickname, 
            avatar: "ok",
            contact: {
                ghLink: item.author.contact.github,
                twLink: item.author.contact.twitter,
                mailLink: item.author.contact.mail,
                liLink: item.author.contact.linkedin
        }}} 
        status={{color: "black" }} /> 
    ))


    const startTime = dayjs(event.timeFrame.startDate).format('HH:mm')

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <NavBar/>
            </div>
                <EventBackground
                    image={event.theme.image}
                    color={event.theme.primaryColor} />
            <div className={styles.content}>

                <CentredContainer className={styles.contentCentred}>
                    <EventTags tags={tags} />
                    <EventHeadline title={event.title} subtitle={event.subtitle || ""}/>

                    <EventDescriptionSection
                        description={event.description || ""}/>

                    <p className={styles.agenda}>Agenda</p>
                    
                    <p className={styles.agendaTime}>{startTime}</p>
                    {lecturesList}

                    
                </CentredContainer>
            </div>
        </div>
    )
};

export default EventView;