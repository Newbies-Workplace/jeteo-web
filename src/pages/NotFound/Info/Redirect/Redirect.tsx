import { FC } from "react";

import { useHistory } from "react-router-dom";

import styles from "./Redirect.css";

export const Redirect: FC = function() {
    const { push } = useHistory();

    const navigateToHome = function() {
        push("/");
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.headText}>
                Gdzie ja to miałem? 🤔
            </h1>
            <h2 className={styles.subText}>
                Strona, ktorej szukałeś, zagubiła się na innej<br />planecie. Nasz zespół astronautów już trenuje<br /> do misji poszukiwawczej!
            </h2>
            <button onClick={navigateToHome} className={styles.button}>
                Powrót na stronę główną
            </button>
        </div>
    );
};

export default Redirect;