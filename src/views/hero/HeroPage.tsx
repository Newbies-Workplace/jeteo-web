import React from "react";
import styles from './HeroPage.module.scss'
import cs from 'classnames'

// Components import

import Button from "../../components/ui/Button/Button";
import GalaxyBackground from "../../components/containers/GalaxyBackground/GalaxyBackground";

// SVG import

import PlanetLogo from "../../assets/images/planet-logo.svg"
import MoonSeparator from "../../assets/images/moon-decoration.svg"
import Presentation from "../../assets/images/presentation-svg.svg"
import SpaceWaveBackground from "../../assets/images/hero-bottom-section-bg.svg"


export const HeroPage: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <GalaxyBackground>
        <div className={styles.frontPageInfo}>
          <div className={styles.logoContainer}>

            <PlanetLogo/>
            
            <div>
              <span className={styles.logoTitle}>jeteo</span><br/>
              <span className={styles.logoSubtitle}>Portal do dzielenia się wiedzą!</span>
            </div>
          
          </div>
          
          <div className={styles.callToAction}>
            <h3>Przeglądaj <br/> wydarzenia w okolicy!</h3>
            <Button className={styles.actionButton}>Lista Wydarzeń</Button>
            <Button className={cs(styles.actionButton, styles.logInButton)}>Zaloguj się</Button>
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Nesciunt fugiat, dolorum excepturi natus explicabo quidem ipsum omnis suscipit iste obcaecati.
                </p>
            </div>
          </div>
        </div>

      </section>

      <section className={styles.heroSection}>

        <div className={styles.heroSectionContentContainer}>
          <div className={styles.heroSectionContent}>
            <div className={styles.heroSectionContentBox}>
              <h3>Trzecia sekcja</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Consectetur voluptatibus recusandae culpa autem eligendi sed similique nemo, 
                distinctio assumenda ipsa excepturi voluptas veniam nesciunt quidem consequatur totam minus repudiandae! Iure?
              </p>
            </div>
          </div>
        </div>

      </section>


    </div>
    
  );
};
