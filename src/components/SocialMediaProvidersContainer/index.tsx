import React from "react";

import styles from "./styles.css";

export const SocialMediaProvidersContainer: React.FC<React.PropsWithChildren<{}>> = ({ children }) => <div className={styles.container}>{children}</div>;

export default SocialMediaProvidersContainer;