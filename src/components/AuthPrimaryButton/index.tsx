import React from "react";

import styles from "./styles.css";

import classNames from "classnames";

interface Props {
    onClick?: () => void;
    margin?: boolean;
}

export const AuthPrimaryButton: React.FC<React.PropsWithChildren<Props>> = ({ children, onClick, margin }) => <button className={margin ? classNames(styles.button, styles.margin) : styles.button} onClick={onClick}>{children}</button>;

export default AuthPrimaryButton;