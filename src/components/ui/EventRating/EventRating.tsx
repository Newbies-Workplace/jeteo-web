import React, {useState} from 'react';
import styles from "./EventRating.module.scss";
import ProfilePic from '../../../assets/images/default-profile-pic.png'
import CloseIcon from '../../../assets/icons/close.svg'
import StarRating from '../StarRating/StarRating';
import { Portal } from 'react-portal';
import { Button } from "../Button/Button";
import {useRateLectureMutation} from "../../../api/graphql";
import {Lecture} from "../../../common/models/Lecture";
import {toast} from "react-toastify";
import { useScrollBlock } from '../../../common/utils/useScrollBlock';
import { useAuth } from '../../../contexts/auth/hooks/useAuth.hook';

interface RatingDialogProps {
    lecture: Lecture
    onDismiss: () => void;
}

export const EventRating: React.FC<RatingDialogProps> = ({ onDismiss, lecture}) => {
    const [topicRate, setTopicRate] = useState(-1)
    const [presentationRate, setPresentationRate] = useState(-1)
    const [opinion, setOpinion] = useState("")

    const {user} = useAuth()

    const [rateLecture] = useRateLectureMutation()

    useScrollBlock()

    const onRateClick = () => {
        if (topicRate === -1 && presentationRate === -1) {
            toast.info("Musisz ocenić temat i prezentację.")
            return
        }

        rateLecture({
            variables: {
                id: lecture.id,
                request: {
                    topicRate: topicRate,
                    presentationRate: presentationRate,
                    opinion: opinion.length === 0 ? undefined : opinion,
                }
            }
        })
            .then(() => {
                toast.success("Twoja ocena została wysłana pomyślnie")
                onDismiss()
            })
            .catch(() => toast.error("Wystąpił błąd"))
    }

    return (
        <Portal>
            <div
                className={styles.ratingDialogWrapper}
                onClick={() => {
                    onDismiss();
                    setTopicRate(-1);
                    setPresentationRate(-1)
                }}>
                <div className={styles.ratingDialog} onClick={(e) => e.stopPropagation()}>
                    <button className={styles.closeButton} onClick={() => {
                        onDismiss();
                        setTopicRate(-1);
                        setPresentationRate(-1)
                    }}><CloseIcon width={"35px"} height={"40px"}/></button>

                    {user && <div className={styles.authorData}>
                        <img className={styles.authorProfilePicture} src={ProfilePic} alt=""/>
                        <div>
                            <span className={styles.authorNickname}>{user?.nickname}</span>
                        </div>
                    </div>}

                    <span className={styles.speechTitle}>{lecture.title}</span>

                    <div className={styles.ratingDialogContent}>
                        <StarRating
                            max={5}
                            value={topicRate}
                            setValue={setTopicRate}
                            className={styles.starRatingLabel}
                            title="Jak ci siadł temat?"
                            width='48px'
                            height='48px'/>
                        <StarRating
                            max={5}
                            value={presentationRate}
                            setValue={setPresentationRate}
                            className={styles.starRatingLabel}
                            title="Jak to zostało zaprezentowane?"
                            width='48px'
                            height='48px'/>

                        <span className={styles.textAreaLabel}>Opinia dla prelegenta</span>
                        <textarea
                            name="userOpinion"
                            id="userOpinion"
                            cols={30}
                            rows={5}
                            className={styles.opinionInput}
                            value={opinion}
                            onChange={(e) => setOpinion(e.target.value)}/>
                    </div>

                    <div className={styles.ratingDialogButtons}>
                        <Button
                            className={styles.buttonW}
                            primary
                            size="medium"
                            onClick={onRateClick}>Oceń</Button>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

