import React from "react";

import styles from "./styles.css";

import GalaxyBg from "../../assets/images/GalaxyBg.png";

import Error404Text from "../../components/Error404Text/Error404Text";
import RedirectAlert from "../../components/RedirectAlert/RedirectAlert";

const Error404: React.FC = () => (
    <div className={styles.error404} style={{backgroundImage: `url(${GalaxyBg})`}}>
        <Error404Text />
        <RedirectAlert />
    </div>
);

export default Error404;