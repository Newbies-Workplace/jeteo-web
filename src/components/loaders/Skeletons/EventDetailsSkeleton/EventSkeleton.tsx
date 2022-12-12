import React from "react";
import { CentredContainer } from "../../../primitives/CenteredContainers";
import styles from "../EventDetailsSkeleton/EventSkeleton.module.scss";
import {LectureListSkeleton} from './LectureListSkeleton/LectureListSkeleton'
import {EventOrganizerSkeleton} from './EventOrganizerSkeleton/EventOrganizerSkeleton'
import { EventDescriptionSkeleton } from "./EvenetDescriptionSkeleton/EventDescriptionSkeleton";

export const EventSkeleton: React.FC = () => {



    return (
    <>
        <div className={styles.eventBackgroundSkeleton}></div>
        <CentredContainer className={styles.contentCentredSkeleton}>

            <div className={styles.eventHeadlineSkeleton}>
                <div className={styles.tagsListSkeleton}>
                    {[...Array(5)].map(el => (
                        <span></span>
                    ))}
                </div>
                <div className={styles.eventHeadlineTitle}>
                    <h1></h1>
                    <h2></h2>
                </div>
            </div>


        <div className={styles.eventInnerContainer}>

                    <div className={styles.eventDescriptionContainer}>
                        <EventDescriptionSkeleton/>
                        <p className={styles.agendaTextSkeleton}></p>
                        <LectureListSkeleton/>
                    </div>

                    <section className={styles.eventOrganizerSection}>
                        <EventOrganizerSkeleton/>
                        <p className={styles.organizerLinkTextSkeleton}></p>
                        <div className={styles.organizerLinkSkeleton}></div>
                        <div className={styles.locationMapSkeleton}></div>
                    </section>

                    </div>
        </CentredContainer>
    </>
)};
