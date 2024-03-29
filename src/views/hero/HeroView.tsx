import React from "react";
import styles from './HeroView.module.scss'
import cs from 'classnames'

import Button from "../../components/atoms/Button/Button";
import GalaxyBackground from "../../components/molecules/GalaxyBackground/GalaxyBackground";

import PlanetLogo from "../../assets/images/planet-logo.svg"
import MoonSeparator from "../../assets/images/moon-decoration.svg"
import Presentation from "../../assets/images/presentation-svg.svg"
import {useNavigate} from "react-router-dom";

export const HeroView: React.FC = () => {
  const navigate = useNavigate()

  return (
      <div className={styles.mainContainer}>
        <GalaxyBackground hidePlanets>
          <div className={styles.frontPageInfo}>
            <div className={styles.logoContainer}>

              <PlanetLogo className={styles.logoComponent}/>

              <div>
                <span className={styles.logoTitle}>jeteo</span><br/>
                <span className={styles.logoSubtitle}>Portal do dzielenia się wiedzą!</span>
              </div>
            </div>

            <div className={styles.callToAction}>
              <h3>Przeglądaj <br/> wydarzenia w okolicy!</h3>

              <Button
                  className={styles.actionButton}
                  onClick={() => navigate("/")}>
                Lista Wydarzeń
              </Button>
              <Button
                  className={cs(styles.actionButton, styles.logInButton)}
                  onClick={() => navigate("/auth/signin")}>
                Zaloguj się
              </Button>
            </div>
          </div>
        </GalaxyBackground>


        <section className={styles.heroSection}>

          <MoonSeparator className={styles.moonSeparator}/>

          <div className={styles.heroSectionContentContainer}>
            <div className={styles.featContent}>
              <h2>Jesteśmy dla</h2>
              <ul className={styles.featContentList}>
                <li>Mówcy</li>
                <li>Słuchacze</li>
                <li>Organizacje</li>
              </ul>
            </div>

            <div className={styles.heroSectionContent}>

              <div className={styles.heroSectionContentBox}>
                <Presentation className={styles.heroSectionContentImage}/>
              </div>

              <div className={styles.heroSectionContentBox}>
                <h3>Czerpnij wiedzę</h3>
                <p>
                  Jesteśmy przekonani iż wiedza od ekspertów, jest warta więcej niż jakikolwiek poradnik na youtube.
                  Staramy się stworzyć miejsce z wyłącznie takich ekspertów.
                </p>
              </div>

            </div>
          </div>

        </section>


        <section className={styles.heroSection}>

          <div className={styles.heroSectionContentContainer}>
            <div className={styles.heroSectionContent}>
              <div className={styles.heroSectionContentBox}>
                <h3>Dziel się wiedzą</h3>
                <p>
                  Masz ego nie z tego świata i potrzebę wygadania się? To miejsce stworzone dla ciebie! Jedynie co potrzebujesz to bycie ekspertem.
                </p>
              </div>
            </div>
          </div>

        </section>

      </div>
  );
};