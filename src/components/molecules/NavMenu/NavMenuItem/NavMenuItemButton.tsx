import React from 'react'

import styles from './NavMenuItem.module.scss'

interface NavMenuItemButtonProps {
    onClick: () => void
}

export const NavMenuItemButton: React.FC<NavMenuItemButtonProps> = ({
    onClick,
    children,
}) => (
    <button className={styles.item} onClick={onClick}>
        {children}
    </button>
)
