import React from "react";
import {MenuBase} from "../../atoms/MenuBase/MenuBase";
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
                {options.map((option, index) => (
                    <React.Fragment key={option.text}>
                        <span
                            className={styles.item}
                            onClick={(e) => {
                                option.onClick()
                                e.stopPropagation()
                            }}
                        >
                            {option.text}
                        </span>

                        {index !== options.length -1 &&
                            <hr className={styles.separator}/>
                        }
                    </React.Fragment>
                ))}
            </div>
        </MenuBase>
    )
}