import React from "react";

import styles from "./styles.css";

const PageContentContainer: React.FC<React.PropsWithChildren<{}>> = ({ children }) => <div className={styles.contentContainer}>{children}</div>;

export default PageContentContainer;