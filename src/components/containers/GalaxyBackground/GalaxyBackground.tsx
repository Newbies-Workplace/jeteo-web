import React from "react";
import styles from "./GalaxyBackground.module.scss";
import PlanetViolet from "../../../assets/images/planet-violet.svg"
import PlanetBlue from "../../../assets/images/planet-blue.svg"
import SpaceFog from "../../../assets/images/space-fog.png"
import Ufo1 from "../../../assets/images/ufo-1.svg"
import Ufo2 from "../../../assets/images/ufo-2.svg"
import Ufo3 from "../../../assets/images/ufo-3.svg"
import Rocket from "../../../assets/images/rocket.svg" // todo rocket svg
import PlanetYellow from "../../../assets/images/planet-yellow.svg"
import SpaceElectricVehicle from "../../../assets/images/chair.svg"

export const GalaxyBackground: React.FC = ({ children }) => {
    return (
        <div className={styles.wrapper} style={{backgroundImage: `url(${SpaceFog})`, backgroundSize: 'cover'}}>
            <div className={styles.stars}/>
            <div className={styles.stars2}/>
            <div className={styles.stars3}/>

            <div className={styles.comets}>
                <div className={styles.comet}/>
                <div className={styles.comet}/>
                <div className={styles.comet}/>
            </div>

            <PlanetViolet className={styles.planet}/>
            <div className={styles.planet2Container}>
                <PlanetYellow className={styles.planet2Moon}/>
                <PlanetBlue className={styles.planet2}/>
            </div>

            <div className={styles.ufoSwarm}>
                <Ufo1 className={styles.ufo}/>
                <Ufo2 className={styles.ufo}/>
                <Ufo3 className={styles.ufo}/>
            </div>

            <Rocket className={styles.rocket}/>

            <SpaceElectricVehicle className={styles.vehicle}/>

            {children}
        </div>
    );
};

export default GalaxyBackground;