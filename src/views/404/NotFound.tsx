import React from "react";
import GalaxyBackground from "../../components/containers/GalaxyBackground/GalaxyBackground";
import { NavBar } from "../../components/ui/NavBar/NavBar";
import Button from "../../components/ui/Button/Button";
import styles from "./NotFound.module.scss"

export const NotFound: React.FC = () => {
    return (
        <GalaxyBackground>
            <NavBar invertColor/>
            
            <div className={styles.container}>
                <div className={styles.innerContainer}>
                    <img src="../../assets/images/not-found.svg" alt="Błąd 404" />
                    <h1>Gdzie ja to miałem?</h1>
                    <p>miejsce do którego zmierzasz już nie istnieje lub nigdy nie istniało</p>
                    <a href="/">
                        <Button primary>
                            Wracamy na stronę główną
                        </Button>
                    </a>
                </div>
            </div>
        </GalaxyBackground>
    )
}