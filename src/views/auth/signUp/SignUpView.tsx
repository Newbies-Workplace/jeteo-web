import React from 'react';
import Button from "../../../components/atoms/Button/Button";
import authStyles from "../../../common/styles/AuthStyles.module.scss"
import styles from "./SignUpView.module.scss"

export const SignUpView: React.FC = () => {

    const onSignUpClick = () => {
        console.log("onSignUpClick")
    }

    return (
        <>
            <span className={authStyles.title}>Jak się nazywasz? 🤔</span>

            <div className={styles.form}>
                <input
                    className={authStyles.input}
                    placeholder="np. Anonimowy Rosomak" />
            </div>

            <div className={styles.buttons}>
                <Button primary onClick={onSignUpClick}>
                    Gotowe
                </Button>
            </div>
        </>
    )
};
