import React from 'react';
import cs from "classnames";

import styles from './CenteredContainers.module.scss';

export interface CentredContainerProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    children: React.ReactNode
    className?: string
}

export const CentredContainer: React.FC<CentredContainerProps> = ({children, className, ...rest}) => (
    <div className={cs(styles.container, className)} {...rest}>
        {children}
    </div>
)