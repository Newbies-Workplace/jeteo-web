import React from 'react';
import LocationIcon from '../../../../assets/icons/location.svg';

import styles from './chipStyles.module.css'

export const LocationChip: React.FC = ({children}) => (
    <div className={styles.chip}>
        <LocationIcon/>
        <span className={styles.text}>
            {children}
        </span>
    </div>
)