import React from "react";
import cs from 'classnames';
import styles from "./Button.module.scss";

interface ButtonProps {
    primary?: boolean
    type?: 'submit' | 'reset' | 'button'
    onClick?: () => void
    size?: 'medium' | 'small'
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = (
    {
        children,
        primary = false,
        type,
        onClick,
        size = 'medium'
    }
) => {
    return (
        <button
            type={type}
            className={
                cs(styles.button, {
                    [styles.primary]: primary,
                    [styles.medium]: size === 'medium',
                    [styles.small]: size === 'small',
                })
            }
            onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;