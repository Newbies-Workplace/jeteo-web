import React from "react";

import styles from "./styles.css";

import PlanetWhere from "../../assets/vectors/planet-where.svg";

import NotFoundPageText from "../../components/NotFoundPageText";
import RedirectAlert from "../../components/NotFoundPageRedirect";
import Navbar from "../../components/Navbar";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import PageContentContainer from "../../components/PageContentContainer";

const NotFoundPage: React.FC = () => (
    <BackgroundWrapper>
        <Navbar />
        <PageContentContainer>
            <div className={styles.textContainer}>
                <NotFoundPageText />
                <RedirectAlert />
            </div>
            <PlanetWhere className={styles.wherePlanet} />
        </PageContentContainer>
    </BackgroundWrapper>
);

export default NotFoundPage;