import React from "react";

import styles from "./AuthButtonsContainer.module.css";

export const AuthButtonsContainer: React.FC = ({ children }) => <div className={styles.container}>{children}</div>;

export default AuthButtonsContainer;