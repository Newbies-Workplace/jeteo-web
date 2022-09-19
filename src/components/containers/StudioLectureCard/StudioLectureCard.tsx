import React, {useState} from "react";
import styles from "./StudioLectureCard.module.scss"
import MoreIcon from "../../../assets/icons/more.svg"
import {Menu} from "../../ui/Menu/Menu";
import cs from "classnames";
import dayjs from "dayjs";

interface Speaker {
    name: string
}

interface StudioLectureCardProps {
    title: string
    descriptionSnippet: string | undefined
    startDate: Date,
    finishDate: Date | undefined,
    speakers: Speaker[]
    onEditClick?: () => void
    onDeleteClick?: () => void
}

export const StudioLectureCard: React.FC<StudioLectureCardProps> = (
    {
        title,
        descriptionSnippet,
        startDate,
        finishDate,
        speakers,
        onEditClick,
        onDeleteClick,
    }
) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const menuOptions = [
        {text: 'Edytuj', onClick: () => onEditClick?.()},
        {text: 'Usuń', onClick: () => onDeleteClick?.()}
    ]

    return (
        <div className={styles.card}>
            <div className={styles.row}>
                <div className={styles.texts}>
                    <h3 style={{margin: 0}}>{title}</h3>
                    <span>{descriptionSnippet}</span>
                </div>

                <MoreIcon className={styles.more} onClick={() => setMenuOpen(true)}/>
                <Menu
                    isOpen={menuOpen}
                    setIsOpen={(open) => setMenuOpen(open)}
                    options={menuOptions}/>
            </div>

            <div className={cs(styles.row, styles.timeFrame)}>
                <span>od {dayjs(startDate).format("YYYY-MM-DD HH:mm")}</span>
                {finishDate &&
                    <span>
                        do {dayjs(finishDate).format("YYYY-MM-DD HH:mm")}
                    </span>
                }
            </div>


            {speakers.length != 0 &&
                <div className={cs(styles.row, styles.speakers)}>
                    {speakers.map(speaker =>
                        <div key={speaker.name} className={styles.speaker}>
                            {speaker.name}
                        </div>
                    )}
                </div>
            }
        </div>
    )
}