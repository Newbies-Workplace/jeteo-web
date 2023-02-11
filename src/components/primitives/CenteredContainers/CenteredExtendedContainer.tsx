import React from 'react';
import cs from "classnames";
import {CentredContainerProps} from "./CenteredContainer";

import styles from './CenteredContainers.module.scss';

export const CenterExtendedContainer: React.FC<CentredContainerProps> = ({children, className, ...rest}) => (
    <div className={cs(styles.extendedContainer, className)} {...rest}>
        {children}
    </div>
)