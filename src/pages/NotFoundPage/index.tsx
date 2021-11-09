import React from "react";

import styles from "./styles.css";

import GalaxyBg from "../../assets/images/GalaxyBg.png";

import NotFoundPageText from "../../components/NotFoundPageText";
import RedirectAlert from "../../components/NotFoundPageRedirect";

const NotFoundPage: React.FC = () => (
    <div className={styles.error404} style={{backgroundImage: `url(${GalaxyBg})`}}>
        <NotFoundPageText />
        <RedirectAlert />
    </div>
);

export default NotFoundPage;