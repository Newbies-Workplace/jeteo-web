import React from 'react';

import styles from './BaseButton.module.scss';

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: string,
    white?: boolean,
}

export const BaseButton: React.FC<BaseButtonProps> = ({children, icon, ...rest}) => {

    return (
        <button className={styles.button} {...rest}>
            {icon && <img src={icon} className={styles.icon}/>}
            <span className={styles.text}>
                {children}
            </span>
        </button>
    );
}