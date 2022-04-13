import React from 'react'
import {Link} from "react-router-dom"

import styles from './NavMenuItem.module.scss'

interface NavMenuItemLinkProps {
    location: string
}

export const NavMenuItemLink: React.FC<NavMenuItemLinkProps> = ({
    location,
    children,
}) => (
    <Link className={styles.item} to={location}>
        {children}
    </Link>
)
