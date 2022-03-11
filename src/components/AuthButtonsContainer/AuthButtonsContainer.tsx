import React from "react";

import styles from "./AuthButtonsContainer.css";

export const AuthButtonsContainer: React.FC<React.PropsWithChildren<{}>> = ({ children }) => <div className={styles.container}>{children}</div>;

export default AuthButtonsContainer;