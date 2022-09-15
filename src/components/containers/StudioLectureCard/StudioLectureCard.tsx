import React, {useState} from "react";
import styles from "./StudioLectureCard.module.scss"
import MoreIcon from "../../../assets/icons/more.svg"
import {MenuBase} from "../../utils/MenuBase/MenuBase";
import {NavMenu} from "../../ui/NavMenu/NavMenu";

interface Speaker {
    name: string
}

interface StudioLectureCardProps {
    title: string
    descriptionSnippet: string | undefined
    speakers: Speaker[]
    onEditClick?: () => void
    onDeleteClick?: () => void
}

export const StudioLectureCard: React.FC<StudioLectureCardProps> = (
    {
        title,
        descriptionSnippet,
        speakers,
        onEditClick,
        onDeleteClick,
    }
) => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className={styles.card}>
            <div className={styles.row}>
                <div className={styles.texts}>
                    <span>{title}</span>
                    <span>{descriptionSnippet}</span>
                </div>

                <MoreIcon className={styles.more} onClick={() => setMenuOpen(true)}/>
                <MenuBase
                    position="left"
                    isOpen={menuOpen}
                    setOpen={(open) => setMenuOpen(open)}>
                    <div className={styles.menu}>
                        <span className={styles.menuItem} onClick={onEditClick}>Edytuj</span>
                        <span className={styles.menuItem} onClick={onDeleteClick}>Usuń</span>
                    </div>
                </MenuBase>
            </div>
            <div className={styles.row}>
                {speakers.map(speaker =>
                    <div key={speaker.name} className={styles.speaker}>
                        {speaker.name}
                    </div>
                )}
            </div>
        </div>
    )
}