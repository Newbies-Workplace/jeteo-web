import React from "react";

import styles from "./styles.css";

const AuthContainer: React.FC<React.PropsWithChildren<{}>> = ({ children }) => <div className={styles.container}>{children}</div>;

export default AuthContainer;