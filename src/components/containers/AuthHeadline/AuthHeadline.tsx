import React from "react";

import styles from "./AuthHeadline.module.css";

const AuthHeadline: React.FC = ({ children }) => <h1 className={styles.headline}>{children}</h1>;

export default AuthHeadline;