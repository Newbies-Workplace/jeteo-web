import React, { useState } from 'react';
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
import LectureCard from '../../components/ui/Lecture/LectureCard';
import { EventOrganizer } from '../../components/ui/EventOrganizer/EventOrganizer';
import { LocationMap } from '../../components/ui/LocationMap/LocationMap';
import { EventSkeleton } from '../../components/loaders/Skeletons/EventDetailsSkeleton/EventSkeleton';
import { EventRating } from '../../components/ui/EventRating/EventRating';
import {Lecture} from "../../common/models/Lecture";


export const EventView: React.FC = () => {

    const [openRatingId, setOpenRatingId] = useState<string | null>(null);

    const { name } = useParams<{name: string}>();
    if (!name)
        return <Navigate to="/"/>;

    const {data, loading, error} = useEventQuery({
        variables: {id: getIdFromVanityUrl(name) }
    })


    if (error)
        return (<>
            <NavBar/>
            <i>error: {error.message}</i>
        </>
        )
    if (loading || !data)
        return (<>
                <NavBar/>
                <EventSkeleton />
            </>
        )


    const { event, lectures } = data;
    const { github, twitter, linkedin, mail} = event.author.contact;
    const tags = event.tags.map(el =>(
        el.name
    ))



    const lecturesList = lectures.map((item, index) => {
        const isAfter = dayjs().isAfter(dayjs(item.timeFrame.startDate))
        const isNow = dayjs().isAfter(dayjs(item.timeFrame.startDate))
        const status = {
            color: "#4340BEE5",
            content:
                <div
                    className={styles.reatingBtn}
                    onClick={() => setOpenRatingId(item.id)}>
                    Oceń✨
                </div>
        }

        return (
            <div key={item.id}>
                {index !== 0 && <p className={styles.agendaTimeStickTop}>|</p>}
                <p className={styles.agendaTime}>{dayjs(item.timeFrame.startDate).format('HH:mm')}</p>
                <p className={styles.agendaTimeStickBottom}>|</p>
                <LectureCard
                    title={item.title}
                    description={item.description}
                    speaker={{
                        name: item.author.nickname,
                        avatar: item.author.avatar,
                        contact: {
                            githubLink: item.author.contact.github,
                            twitterLink: item.author.contact.twitter,
                            emailLink: item.author.contact.mail,
                            linkedInLink: item.author.contact.linkedin
                        }
                    }}
                    status={status}/>
                {openRatingId === item.id && <EventRating
                    lecture={Lecture.fromData(item)}
                    onDismiss={() => setOpenRatingId(null)}
                />}
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
                            <EventOrganizer logo={event.author.avatar} name={event.author.nickname} bio={event.author.description} links={{githubLink: github, twitterLink: twitter, emailLink: mail, linkedInLink: linkedin}}/>
                            <p className={styles.eventLinksText}>Linki wydarzenia</p>
                            {/* <EventLink /> miejsce na Linki do wydarzenia*/}
                            {event?.address && event.address?.coordinates && <LocationMap coordinates={event.address?.coordinates && {lat: event.address?.coordinates?.latitude, lng: event.address?.coordinates?.longitude}} address={event.address?.place}/>}
                        </section>
                    </div>
                </CentredContainer>

            </div>
        </div>
    )
};

export default EventView;