import React from "react";
import styles from './HeroPage.module.scss'

//components import
import Button from "../../components/ui/Button/Button";
import GalaxyBackground from "../../components/containers/GalaxyBackground/GalaxyBackground";

//svg import
import PlanetLogo from "../../assets/images/planet-logo.svg"
import MoonSeparator from "../../assets/images/moon-decoration.svg"
import Presentation from "../../assets/images/presentation-svg.svg"



export const HeroPage: React.FC = () => {
  return (

    //firts Page
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
            <h3 className={styles.callToActionText}>Przeglądaj <br/> wydarzenia w okolicy!</h3>
            <Button >Lista Wydarzeń</Button>
            <Button logIn size='medium'>Zaloguj się</Button>
          </div>
        </div>
      </GalaxyBackground>



      {/* Second Page */}



      <div className={styles.heroSection}>

        <MoonSeparator className={styles.moonSeparator}/>

        <div className={styles.heroSectionContentWrapper}>

          <div className={styles.heroFeatContentContainer}>
            <h2 className={styles.featContentTitle}>Jesteśmy dla</h2>
            <div className={styles.featContentBox}>
              <span className={styles.featContentPerson}>Mówcy</span>
              <span className={styles.featContentPerson}>Słuchacze</span>
              <span className={styles.featContentPerson}>Organizacje</span>
            </div>
          </div>

          <div className={styles.heroDownSection}>
            
            <div className={styles.heroPresentation}>
              <Presentation/>
            </div>
            <div className={styles.heroInfoContainer}>
              <h3 className={styles.heroInfoTitle}>Czerpnij wiedzę</h3>
              <p className={styles.description}>Jesteśmy przekonani iż wiedza od ekspertów, jest warta więcej niż jakikolwiek poradnik na youtube. Staramy się stworzyć miejsce z wyłącznie takich ekspertów.</p>
            </div>
          </div>
        </div>

      </div>




    </div>
    
  );
};
