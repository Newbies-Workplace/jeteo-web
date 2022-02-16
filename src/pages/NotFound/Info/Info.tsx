import { FC } from "react";

import Redirect from "./Redirect/Redirect";
import Text404 from "./Text404/Text404";

import styles from "./Info.css";

export const NotFoundPageAlert: FC = function() {
    return (
        <div className={styles.textContainer}>
            <Text404 />
            <Redirect />
        </div>
    );
};

export default NotFoundPageAlert;