import React, { useState } from 'react';
import { useParams, Navigate } from "react-router-dom";
import { EventBackground } from "../../components/atoms/EventBackground/EventBackground";
import { NavBar } from "../../components/organisms/NavBar/NavBar";
import { getIdFromVanityUrl } from "../../common/utils/vanityUrlUtils";
import {EventDescriptionSection} from "../../components/molecules/EventDescriptionSection/EventDescriptionSection";
import {useEventQuery} from "../../api/graphql";
import { CentredContainer } from "../../components/atoms/CenteredContainers";
import styles from './EventView.module.scss';
import EventTags from '../../components/molecules/EventTags/EventTags';
import { EventHeadline } from '../../components/atoms/EventHeadline/EventHeadline';
import dayjs from 'dayjs';
import LectureCard from '../../components/molecules/Lecture/LectureCard';
import { EventOrganizer } from '../../components/molecules/EventOrganizer/EventOrganizer';
import { LocationMap } from '../../components/molecules/LocationMap/LocationMap';
import { EventSkeleton } from '../../components/molecules/Skeletons/EventDetailsSkeleton/EventSkeleton';
import { LectureRateDialog } from '../../components/organisms/LectureRateDialog/LectureRateDialog';

export const EventView: React.FC = () => {
    const [openRatingId, setOpenRatingId] = useState<string | null>(null);

    const {name} = useParams<{name: string}>();
    if (!name) {
        return <Navigate to="/"/>
    }

    const {data, loading, error} = useEventQuery({
        variables: {id: getIdFromVanityUrl(name) }
    })


    if (error) {
        return (
            <>
                <NavBar/>
                <i>error: {error.message}</i>
            </>
        )
    }
    if (loading || !data) {
        return (
            <>
                <NavBar/>
                <EventSkeleton />
            </>
        )
    }

    const { event, lectures } = data
    const { github, twitter, linkedin, mail} = event.author.contact
    const tags = event.tags.map(el => el.name)

    const lecturesList = lectures.map((item, index) => {
        const status = {
            color: "#4340BEE5",
            content:
                <div
                    className={styles.ratingButton}
                    onClick={() => setOpenRatingId(item.id)}>
                    OCEŃ ✨
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

                {openRatingId === item.id &&
                    <LectureRateDialog
                        lecture={item}
                        onDismiss={() => setOpenRatingId(null)}
                    />
                }
            </div>
        )})

    return (
        <div className={styles.main}>
            <NavBar/>

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
                            <EventDescriptionSection description={event.description || ""}/>

                            <p className={styles.agenda}>Agenda</p>
                            {lecturesList}
                        </div>

                        <section className={styles.eventOrganizerSection}>
                            <EventOrganizer
                                logo={event.author.avatar}
                                name={event.author.nickname}
                                description={event.author.description}
                                links={{
                                    githubLink: github,
                                    twitterLink: twitter,
                                    emailLink: mail,
                                    linkedInLink: linkedin
                                }}/>

                            {event?.address &&
                                <LocationMap
                                    coordinates={
                                        event.address?.coordinates && {
                                            lat: event.address.coordinates.latitude,
                                            lng: event.address.coordinates.longitude
                                        }
                                    }
                                    place={event.address?.place} />
                            }
                        </section>
                    </div>
                </CentredContainer>
            </div>
        </div>
    )
};

export default EventView;