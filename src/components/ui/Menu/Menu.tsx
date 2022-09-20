import React from "react";
import {MenuBase} from "../../utils/MenuBase/MenuBase";
import styles from './Menu.module.scss'

interface MenuOption {
    text: string
    onClick: () => void
}

interface MenuProps {
    position?: 'left' | 'center' | 'right'
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    options: MenuOption[]
}

export const Menu: React.FC<MenuProps> = ({position = 'left', isOpen, setIsOpen, options}) => {
    return (
        <MenuBase
            position={position}
            isOpen={isOpen}
            setOpen={(open) => setIsOpen(open)}>
            <div className={styles.menu}>
                {options.map((option) => (
                    <span
                        key={option.text}
                        className={styles.item}
                        onClick={() => option.onClick()}>
                      {option.text}
                  </span>
                ))}
            </div>
        </MenuBase>
    )
}