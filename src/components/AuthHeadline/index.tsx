import React from "react";

import styles from "./styles.css";

const AuthHeadline: React.FC<React.PropsWithChildren<{}>> = ({ children }) => <h1 className={styles.headline}>{children}</h1>;

export default AuthHeadline;