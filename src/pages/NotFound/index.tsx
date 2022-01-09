import { FC } from "react";

import styles from "./styles.css";

import PlanetWhere from "../../assets/vectors/planet-where.svg";

import Navbar from "../../components/Navbar";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import PageContentContainer from "../../components/PageContentContainer";

import Info from "./Info";

export const NotFound: FC = function() {
    return (
        <BackgroundWrapper>
            <Navbar />
            <PageContentContainer>
                <Info />
                <PlanetWhere className={styles.wherePlanet} />
            </PageContentContainer>
        </BackgroundWrapper>
    );
};

export default NotFound;