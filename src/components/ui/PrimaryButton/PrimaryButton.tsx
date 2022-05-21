import React from "react";

import styles from "./PrimaryButton.module.css";

interface PrimaryButtonProps {
    onClick?: () => void;
}

export const PrimaryButton: React.FC<React.PropsWithChildren<PrimaryButtonProps>> = ({ children, onClick }) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}>
            {children}
        </button>
    )
}

export default PrimaryButton;