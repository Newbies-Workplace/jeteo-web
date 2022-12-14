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
import { EventOrganizer } from '../../components/ui/EventOrganizer/EventOrganizer';
import EventLink from '../../components/ui/EventLink/EventLink';
import { LocationMap } from '../../components/ui/LocationMap/LocationMap';
import { EventSkeleton } from '../../components/loaders/Skeletons/EventDetailsSkeleton/EventSkeleton';

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
        return (<>
            <NavBar/>
            <EventSkeleton />
        </>
        )


    const { event, lectures } = data;

    const tags = event.tags.map(el =>( 
            el.name
    ))



    const lecturesList = lectures.map((item, index) => {

        console.log(dayjs().add(1, "day"))
        const isAfter = dayjs().isAfter(dayjs(item.timeFrame.startDate))
        const isNow = dayjs().isAfter(dayjs(item.timeFrame.startDate))
        
        const status = isAfter ? {color: "#4340BEE5", content: <button>Oceń</button> } : {color: "#BE4040", content: <p>działa</p>}


        return (
        <div key={item.id}>
            {index !== 0 && <p className={styles.agendaTimeStickTop}>|</p>}
            <p className={styles.agendaTime}>{dayjs(item.timeFrame.startDate).format('HH:mm')}</p>
            <p className={styles.agendaTimeStickBottom}>|</p>
            <Lecture title={item.title} description={item.description} speaker={{
                name: item.author.nickname, 
                contact: {
                    githubLink: item.author.contact.github,
                    twitterLink: item.author.contact.twitter,
                    emailLink: item.author.contact.mail,
                    linkedInLink: item.author.contact.linkedin
            }}} 
            status={status} /> 
        </div>
    )})


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
                    <div>
                        <EventTags tags={tags} />
                        <EventHeadline title={event.title} subtitle={event.subtitle || ""}/>
                    </div>

                    <div className={styles.eventInnerContainer}>
                    <div className={styles.eventDescriptionContainer}>
                        <EventDescriptionSection
                            description={event.description || ""}/>
                        <p className={styles.agenda}>Agenda</p>
                        {lecturesList}
                    </div>

                    <section className={styles.eventOrganizerSection}>
                        <EventOrganizer logo="" name="Team Jeteo" bio="Super ekstra mega omega giga okropny squad do pisania aplikacji webowych. Z brakiem doświadczenia, przepisujących projekt z php pod nową nazwą." links={{}}/>
                        <p className={styles.eventLinksText}>Linki wydarzenia</p>
                        <EventLink url='#' name='#' />
                        <LocationMap latitude={51.085670625464104} longitude={17.010400182993322} address="RST Software Masters"/>
                    </section>

                    </div>
                    
                </CentredContainer>
                
            </div>
        </div>
    )
};

export default EventView;