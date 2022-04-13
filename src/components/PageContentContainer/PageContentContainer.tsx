import React, { FC } from "react";

import styles from "./PageContentContainer.css";

export const PageContentContainer: FC = function({ children }) {
    return (
        <div className={styles.contentContainer}>
            {children}
        </div>
    );
};

export default PageContentContainer;