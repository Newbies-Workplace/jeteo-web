import React from 'react';
import LocationIcon from '../../../../assets/images/icons/location.svg';

import styles from './chipStyles.css'

export const LocationChip: React.FC = ({children}) => (
    <div className={styles.chip}>
        <LocationIcon/>
        <span className={styles.text}>
            {children}
        </span>
    </div>
)