import React from 'react';
import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";
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
                <PrimaryButton onClick={onSignUpClick}>
                    Gotowe
                </PrimaryButton>
            </div>
        </>
    )
};
