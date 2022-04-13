import React, { FC } from "react";

import styles from "./PageContentContainer.module.css";

export const PageContentContainer: FC = function({ children }) {
    return (
        <div className={styles.contentContainer}>
            {children}
        </div>
    );
};

export default PageContentContainer;