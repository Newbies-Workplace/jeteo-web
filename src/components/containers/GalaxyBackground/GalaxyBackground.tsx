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

interface GalaxyBackgroundProps {
    hideStars?: boolean;
    hideComets?: boolean;
    hideMainPlanet?: boolean;
    hideUfoSwarm?: boolean;
    hideRocket?: boolean;
    hideVehicle?: boolean;
}

export const GalaxyBackground: React.FC<GalaxyBackgroundProps> = (
        { 
            children,
            hideStars,
            hideComets,
            hideMainPlanet,
            hideUfoSwarm,
            hideRocket,
            hideVehicle
        }
    ) => {
    return (
        <div className={styles.wrapper} style={{backgroundImage: `url(${SpaceFog})`, backgroundSize: 'cover'}}>
            {!hideStars &&
                <>
                    <div className={styles.stars}/>
                    <div className={styles.stars2}/>
                    <div className={styles.stars3}/>
                </>
            }

            {!hideComets &&
                <>
                    <div className={styles.comets}>
                        <div className={styles.comet}/>
                        <div className={styles.comet}/>
                        <div className={styles.comet}/>
                    </div>
                </>
            }

            {!hideMainPlanet &&
                <>
                    <PlanetViolet className={styles.planet}/>
                        <div className={styles.planet2Container}>
                        <PlanetYellow className={styles.planet2Moon}/>
                        <PlanetBlue className={styles.planet2}/>
                    </div>
                </>
            }

            {!hideUfoSwarm &&
                <>
                    <div className={styles.ufoSwarm}>
                        <Ufo1 className={styles.ufo}/>
                        <Ufo2 className={styles.ufo}/>
                        <Ufo3 className={styles.ufo}/>
                    </div>
                </>
            }

            {!hideRocket && <Rocket className={styles.rocket}/>}

            {!hideVehicle && <SpaceElectricVehicle className={styles.vehicle}/>}

            {children}
        </div>
    );
};

export default GalaxyBackground;