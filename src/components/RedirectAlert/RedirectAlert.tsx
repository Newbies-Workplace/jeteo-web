import React from "react";

import styles from "./style.css";

const RedirectAlert: React.FC<{}> = () => (
    <div className={styles.container}>
        <h1 className={styles.headText}>
            Houston, mamy problem 😔
        </h1>
        <h2 className={styles.subText}>
            Strona, ktorej szukałeś, zagubiła się na innej<br />planecie. Nasz zespół astronautów już trenuje<br /> do misji poszukiwawczej!
        </h2>
        <button className={styles.button}>
            Powrót na stronę główną
        </button>
    </div>
);

export default RedirectAlert;