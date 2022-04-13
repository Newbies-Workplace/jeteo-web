import React from 'react';
import cs from 'classnames';

import Mark from '../../../assets/brand/mark.svg';
import Logotype from '../../../assets/brand/logotype.svg';

import styles from './AppLogo.module.scss';

interface AppLogoProps {
    vertical?: boolean
    invert?: boolean
}

export const AppLogo: React.FC<AppLogoProps> = ({ vertical, invert }) => {

    const styleMods = {
        [styles.vertical]: vertical,
        [styles.invert]: invert,
    }

    return (
        <span className={cs(styles.logo, styleMods)}>
            <Mark className={styles.mark}/>
            <Logotype className={styles.logotype}/>
        </span>
    );
}