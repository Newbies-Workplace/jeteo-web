import { FC } from "react";

import styles from "./NotFound.css";

import PlanetWhere from "../../assets/vectors/planet-where.svg";

import Navbar from "../../components/Navbar/Navbar";
import BackgroundWrapper from "../../components/BackgroundWrapper/BackgroundWrapper";
import PageContentContainer from "../../components/PageContentContainer/PageContentContainer";

import Info from "./Info/Info";

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