import { FC } from "react";

import Redirect from "./Redirect";
import Text404 from "./Text404";

import styles from "./styles.css";

export const NotFoundPageAlert: FC = function() {
    return (
        <div className={styles.textContainer}>
            <Text404 />
            <Redirect />
        </div>
    );
};

export default NotFoundPageAlert;