import React from "react";

import styles from "./styles.css";

import GalaxyBg from "../../assets/images/GalaxyBg.png";

import PlanetWhere from "../../assets/vectors/planet-where.svg";

import NotFoundPageText from "../../components/NotFoundPageText";
import RedirectAlert from "../../components/NotFoundPageRedirect";
import Navbar from "../../components/Navbar";

const NotFoundPage: React.FC = () => (
    <div className={styles.container} style={{backgroundImage: `url(${GalaxyBg})`}}>
        <Navbar />
        <div className={styles.contentContainer}>
            <div className={styles.textContainer}>
                <NotFoundPageText />
                <RedirectAlert />
            </div>
            <PlanetWhere className={styles.wherePlanet} />
        </div>
    </div>
);

export default NotFoundPage;