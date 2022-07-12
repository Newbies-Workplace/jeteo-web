import React from "react";

import styles from "./PrimaryButton.module.css";

interface PrimaryButtonProps {
    type?: 'submit' | 'reset' | 'button';
    onClick?: () => void;
}

export const PrimaryButton: React.FC<React.PropsWithChildren<PrimaryButtonProps>> = ({ children, type, onClick }) => {
    return (
        <button
            type={type}
            className={styles.button}
            onClick={onClick}>
            {children}
        </button>
    )
}

export default PrimaryButton;