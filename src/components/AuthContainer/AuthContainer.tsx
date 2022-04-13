import React from "react";

import styles from "./AuthContainer.css";

const AuthContainer: React.FC = ({ children }) => <div className={styles.container}>{children}</div>;

export default AuthContainer;