import { FC } from "react";

import styles from "./PageContentContainer.css";

export const PageContentContainer: FC<React.PropsWithChildren<{}>> = function({ children }) {
    return (
        <div className={styles.contentContainer}>
            {children}
        </div>
    );
};

export default PageContentContainer;