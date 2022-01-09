import { FC } from "react";

import styles from "./styles.css";

export const PageContentContainer: FC<React.PropsWithChildren<{}>> = function({ children }) {
    return (
        <div className={styles.contentContainer}>
            {children}
        </div>
    );
};

export default PageContentContainer;