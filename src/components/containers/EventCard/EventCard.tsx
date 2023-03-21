import React from "react";
import { LocationChip } from "./chips/LocationChip";
import { StartDateChip } from "./chips/StartDateChip";
import dayjs from "dayjs";
import styles from "./EventCard.module.scss";
import { Link } from "react-router-dom";
import { Tag } from "../../../common/models/Tag";
import EventTags from "../../ui/EventTags/EventTags";

interface EventCardProps {
    title: string;
    subtitle?: string;

    color?: string;
    image?: string;

    startDate?: Date;
    finishDate?: Date;
    locationName?: string;
    link: string;
    tags?: Tag[];
}

export const EventCard: React.FC<EventCardProps> = (
    {
        title,
        subtitle,
        color = "#4fd0bd",
        image,
        startDate,
        finishDate,
        locationName,
        link,
        tags,
    }
) => {
    const currentDate = dayjs();
    const startEventDate = dayjs(startDate);
    const finishEventDate = dayjs(finishDate);
    const timeToEvent = startEventDate.diff(currentDate, "hours");
    const timeAfterEvent = currentDate.diff(finishEventDate, "hours");
    const timeLeftToFinish = finishEventDate.diff(currentDate, "hours");
    const isDuringEvent = currentDate.isBetween(finishDate, startEventDate, "hours");

    if (timeAfterEvent > 24) {
        color = "#4E4D5A";
    }

    const cardStyle: React.CSSProperties = {
        backgroundColor: `${color}`,
        backgroundImage: `linear-gradient(90deg, ${color}a0, ${color}), url(${image})`,
    };

    return (
        <div className={styles.cardWrapper}>
            <Link to={link} className={styles.link}>
                <div style={cardStyle} className={styles.card}>
                    <h2 className={styles.title}>{title}</h2>
                    <h3 className={styles.subtitle}>{subtitle}</h3>

                    {tags &&
                        <EventTags tags={tags?.map(tag => tag.name)} size={'small'}/>
                    }

                    <div className={styles.infoSection}>
                        <div className={styles.bottom}>
                            {locationName &&
                                <LocationChip>
                                    {locationName}
                                </LocationChip>
                            }

                            {startDate &&
                                <StartDateChip date={startDate} />
                            }
                        </div>

                        {timeToEvent <= 72 && timeToEvent > 0 && (
                            <div className={styles.timeToEvent}>
                                <span>{timeToEvent}h do rozpoczęcia</span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>

            {timeAfterEvent <= 24 && timeAfterEvent >= 0 && (
                <Link
                    to={link}
                    className={styles.action}
                    style={{backgroundColor: color}}>
                    <span>Kliknij aby ocenić</span>
                    <span>zakończono: {timeAfterEvent}h temu 🎊</span>
                </Link>
            )}
            {isDuringEvent && (
                <div
                    className={styles.action}
                    style={{backgroundColor: color}}>
                    <span>W trakcie</span>
                    <span>pozostało: {timeLeftToFinish}h</span>
                </div>
            )}
        </div>
    );
};
