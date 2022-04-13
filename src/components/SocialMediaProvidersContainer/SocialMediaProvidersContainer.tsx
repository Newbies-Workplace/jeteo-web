import React from "react";

import styles from "./SocialMediaProvidersContainer.css";

export const SocialMediaProvidersContainer: React.FC = ({ children }) => <div className={styles.container}>{children}</div>;

export default SocialMediaProvidersContainer;