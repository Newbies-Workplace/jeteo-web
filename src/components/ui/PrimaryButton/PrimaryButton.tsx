import React from "react";

import cs from 'classnames';
import styles from "./PrimaryButton.module.scss";

interface PrimaryButtonProps {
    type?: 'submit' | 'reset' | 'button';
    onClick?: () => void;
    size?: 'medium' | 'small'
}

export const PrimaryButton: React.FC<React.PropsWithChildren<PrimaryButtonProps>> = ({ children, type, onClick, size = 'medium' }) => {
    return (
        <button
            type={type}
            className={
                cs(styles.button, {
                    [styles.medium]: size === 'medium',
                    [styles.small]: size === 'small',
                })
            }
            onClick={onClick}>
            {children}
        </button>
    )
}

export default PrimaryButton;