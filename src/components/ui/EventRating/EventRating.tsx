import React, {useState} from 'react';
import styles from "./EventRating.module.scss";
import ProfilePic from '../../../assets/images/default-profile-pic.png'
import CloseIcon from '../../../assets/icons/close.svg'
import StarRating from '../StarRating/StarRating';
import { Portal } from 'react-portal';
import { Button } from "../Button/Button";

interface RatingDialogProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export const EventRating: React.FC<RatingDialogProps> = ({isOpen, setIsOpen}) => {

    const [value, setValue] = useState(-1);
    const [valueSecond, setValueSecond] = useState(-1);


    if (!isOpen){
        document.body.style.overflow = 'auto'
        return null
    }

    document.body.style.overflow = 'hidden'

    return (
        <>
            <Portal>
                <div className={styles.ratingDialogWrapper } onClick={() => setIsOpen(false)}>
                    <div className={styles.ratingDialog} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={() => setIsOpen(false)}><CloseIcon/></button>

                        <div className={styles.authorData}>
                            <img className={styles.authorProfilePicture} src={ProfilePic} alt="" />
                            <div>
                                <span className={styles.authorNickname}>Andrzej Duda</span>
                                <span className={styles.authorNote}>Lorem ipsum dolor sit amet.</span>
                            </div>
                        </div>

                        <span className={styles.speechTitle}>Lorem ipsum dolor sit, amet consectetur adipisicing.</span>

                        <div className={styles.ratingDialogContent}>
                            <StarRating max={5} value={value} setValue={setValue} className={styles.starRatingLabel} title="Jak ci siadł temat?" width='48px' height='48px'/>
                            <StarRating max={5} value={valueSecond} setValue={setValueSecond} className={styles.starRatingLabel} title="Jak to zostało zaprezentowane?" width='48px' height='48px'/>
                            <span className={styles.textAreaLabel}>Opinia dla prelegenta</span>
                            <textarea name="userOpinion" id="userOpinion" cols={30} rows={5} className={styles.opinionInput}/>
                        </div>

                        <div className={styles.ratingDialogButtons}>
                            <Button size="small">Pomiń</Button>
                            <Button primary size="small">Oceń</Button>
                        </div>
                    </div>
                </div>
            </Portal>
        </>
    )
}

