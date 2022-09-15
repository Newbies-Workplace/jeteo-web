import React from "react";
import cs from 'classnames';
import styles from "./Button.module.scss";

interface ButtonProps {
    secondary?: boolean
    type?: 'submit' | 'reset' | 'button'
    onClick?: () => void
    size?: 'medium' | 'small'
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = (
    {
        children,
        secondary = false,
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
                    [styles.secondary]: secondary,
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