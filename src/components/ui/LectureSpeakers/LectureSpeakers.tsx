import React, {useState} from "react";
import styles from "./LectureSpeakers.module.scss"
import {Input} from "../Input/Input";
import Button from "../Button/Button";
import DeleteIcon from "../../../assets/icons/delete.svg";
import {Avatar} from "../Avatar/Avatar";

interface LectureSpeakersProps {
    lectureId: string
    invites: {
        id: string
        name: string
    }[]
    speakers: {
        id: string
        avatar?: string
        name: string
    }[]
    onCreateInvite: (name: string) => void
    onDeleteSpeaker: (speakerId: string) => void
    onDeleteInvite: (inviteId: string) => void
}

export const LectureSpeakers: React.FC<LectureSpeakersProps> = (
    {
        invites,
        speakers,
        onCreateInvite,
        onDeleteSpeaker,
        onDeleteInvite,
    }
) => {
    const [inviteName, setInviteName] = useState('')

    return (
        <div className={styles.container}>
            <div className={styles.items}>
                {invites.map(invite =>
                    <InviteItem
                        id={invite.id}
                        key={invite.id}
                        name={invite.name}
                        onDeleteClick={() => {onDeleteInvite(invite.id)}}/>
                )}

                {speakers.map(speaker =>
                    <SpeakerItem
                        key={speaker.id}
                        avatar={speaker.avatar}
                        name={speaker.name}
                        onDeleteClick={() => {onDeleteSpeaker(speaker.id)}}/>
                )}
            </div>

            {speakers.length + invites.length < 2 &&
                <>
                    <div className={styles.separator}/>

                    <div className={styles.createSection}>
                        <Input
                            label={"Nazwa zaproszenia"}
                            placeholder={'np. "dla Jana Kowalskiego"'}
                            value={inviteName}
                            setValue={(value) => setInviteName(value)}/>

                        <Button
                            size={'small'}
                            type={'button'}
                            primary
                            onClick={() => onCreateInvite(inviteName)}
                        >
                            Dodaj
                        </Button>
                    </div>
                </>
            }
        </div>
    )
}

interface InviteItemProps {
    id: string
    name: string
    onDeleteClick: () => void
}

const InviteItem: React.FC<InviteItemProps> = ({id, name, onDeleteClick}) => {

    const onInviteCopyClick = () => {
        //todo
    }

    return (
        <div className={styles.item}>
            <span>
                {name}
            </span>

            <div className={styles.itemActions}>
                <Button
                    primary
                    type={'button'}
                    size={'small'}>
                    Skopiuj link
                </Button>

                <DeleteIcon
                    className={styles.action}
                    onClick={onDeleteClick}/>
            </div>
        </div>
    )
}

interface SpeakerItemProps {
    avatar?: string
    name: string
    onDeleteClick: () => void
}

const SpeakerItem: React.FC<SpeakerItemProps> = ({avatar, name, onDeleteClick}) => {
    return (
        <div className={styles.item}>
            <div className={styles.speaker}>
                <Avatar
                    url={avatar}
                    className={styles.avatar} />

                {name}
            </div>

            <div className={styles.itemActions}>
                <DeleteIcon
                    className={styles.action}
                    onClick={onDeleteClick}/>
            </div>
        </div>
    )
}