import React from "react";
import { CentredContainer } from "../../../primitives/CenteredContainers";
import styles from "../EventDetailsSkeleton/EventSkeleton.module.scss";
import {EventOrganizerSkeleton} from './EventOrganizerSkeleton/EventOrganizerSkeleton'
import { EventDescriptionSkeleton } from "./EvenetDescriptionSkeleton/EventDescriptionSkeleton";
import BackArrowSvg from "../../../../assets/icons/left-arrow-rounded.svg";



export const EventSkeleton: React.FC = () => {

    return (
    <>
        <div className={styles.eventBackgroundSkeleton}></div>
        <CentredContainer className={styles.contentCentredSkeleton}>

            <div className={styles.eventHeadlineSkeleton}>
                <div className={styles.tagsListSkeleton}>
                    {[...Array(5)].map(el => (
                        <span key={el}></span>
                    ))}
                </div>
                <div className={styles.eventHeadlineTitle}>
                    <BackArrowSvg className={styles.backArrowSkeleton}/>
                </div>
            </div>


        <div className={styles.eventInnerContainerSkeleton}>

                    <div className={styles.eventDescriptionContainer}>
                        <EventDescriptionSkeleton/>
                        {[...Array(3)].map((item, index) =>(
                            <div key={index}>
                                <div className={styles.centerWrapperSkeleton}>
                                    <p className={styles.agendaTimeSkeleton}></p>
                                    <p className={styles.agendaTimeStickTopSkeleton}></p>
                                </div>
                                <div className={styles.lectureSkeleton}>
                                    <div className={styles.lectureAvatarSkeleton}></div>
                                </div>
                                <div className={styles.centerWrapperSkeleton}>
                                {index !== 2 && <p className={styles.agendaTimeStickBottomSkeleton}></p>}
                                </div>
                            </div>
                        ))}
                    </div>

                    <section>
                        <div className={styles.eventOrganizerContainerSkeleton}>
                            <div className={styles.eventOrganizerAvatarSkeleton}></div>
                        </div>
                        <div className={styles.eventLinksContainerSkeleton}>
                            <p className={styles.organizerLinkTextSkeleton}></p>
                            <p className={styles.organizerLinkTextSkeleton}></p>
                        </div>
                        <div className={styles.organizerLinkSkeleton}></div>
                        <div className={styles.locationMapSkeleton}></div>
                    </section>

                    </div>
        </CentredContainer>
    </>
)};
