import React from 'react';

import styles from './SectionContainer.module.scss';

interface SectionContainerProps {
    label: string
    children: React.ReactNode
}

export const SectionContainer: React.FC<SectionContainerProps> = ({label, children}) => (
    <div className={styles.container}>
        <h3 className={styles.label}>{label}</h3>
        {children}
    </div>
)