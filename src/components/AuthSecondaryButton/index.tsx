import React from "react";

import styles from "./styles.css";

interface Props {
    onClick?: () => void;
}

export const AuthSecondaryButton: React.FC<React.PropsWithChildren<Props>> = ({ children, onClick }) => <button className={styles.button} onClick={onClick}>{children}</button>;

export default AuthSecondaryButton;