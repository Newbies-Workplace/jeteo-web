import React, {useState} from 'react';
import styles from "./EventRating.module.scss";
import ProfilePic from '../../../assets/images/default-profile-pic.png'
import CloseIcon from '../../../assets/icons/close.svg'
import StarRating from '../StarRating/StarRating';
import { Portal } from 'react-portal';
import { Button } from "../Button/Button";
import {CoreLectureResponseFragment, useRateLectureMutation} from "../../../api/graphql";
import {toast} from "react-toastify";
import { useScrollBlockHook } from '../../../contexts/auth/hooks/useScrollBlock.hook';

interface LectureRateDialogProps {
    lecture: CoreLectureResponseFragment
    onDismiss: () => void;
}

export const LectureRateDialog: React.FC<LectureRateDialogProps> = ({ onDismiss, lecture}) => {
    const [topicRate, setTopicRate] = useState(-1)
    const [presentationRate, setPresentationRate] = useState(-1)
    const [opinion, setOpinion] = useState("")

    const [rateLecture] = useRateLectureMutation()

    useScrollBlockHook()

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
                    <button
                        className={styles.closeButton}
                        onClick={() => {
                            onDismiss()
                            setTopicRate(-1)
                            setPresentationRate(-1)
                        }}>
                        <CloseIcon
                            width={"40px"}
                            height={"40px"}/>
                    </button>

                    <div className={styles.authorData}>
                        <img
                            className={styles.authorProfilePicture}
                            src={lecture.author?.avatar ?? ProfilePic}
                            alt=""/>

                        <span className={styles.authorNickname}>
                            {lecture.author?.nickname ?? "aaa"}
                        </span>
                    </div>

                    <span className={styles.speechTitle}>{lecture.title}</span>

                    <div className={styles.ratingDialogContent}>
                        <StarRating
                            max={5}
                            value={topicRate}
                            setValue={setTopicRate}
                            className={styles.starRatingLabel}
                            title="Jak siadł Ci temat?" />

                        <StarRating
                            max={5}
                            value={presentationRate}
                            setValue={setPresentationRate}
                            className={styles.starRatingLabel}
                            title="Jak to zostało zaprezentowane?" />

                        <textarea
                            name="userOpinion"
                            id="userOpinion"
                            placeholder={"Opcjonalny feedback"}
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

